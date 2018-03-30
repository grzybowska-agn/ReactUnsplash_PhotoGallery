import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import PhotoThumbnail from './PhotoThumbnail'
import Loader from './Loader'
import css from './Collection.scss'

@observer
class Collection extends Component {
  constructor() {
    super()
    this.state = {
      sortOptions: [
        {id: 1, label: 'latest', value: 'latest', active: true},
        {id: 2, label: 'most popular', value: 'popular', active: false}
      ]
    }

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    const { id, perPage, route, store: { currentCollection, fetchCollection } } = this.props
    const { sortOptions } = this.state

    const sort = sortOptions.find(item => item.active === true).value
    const collection = currentCollection(id, sort)

    if (!collection || (route === 'collection' && (collection.photos.length < 30))) {
      fetchCollection(id, perPage, sort)
    }

    if (route === 'collection') {
      document.addEventListener('scroll', this.onScroll)
    }
  }

  componentWillUnmount() {
    const { route } = this.props

    if (route === 'collection') {
      document.removeEventListener('scroll', this.onScroll)
    }
  }

  onScroll() {
    const { id, store: { currentCollection, fetchCollection, isFetching } } = this.props
    const { sortOptions } = this.state

    const sort = sortOptions.find(item => item.active === true).value
    const collection = currentCollection(id, sort)

    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight)  {    
      if (isFetching || !collection.canFetchMore) return false
      fetchCollection(id, 30, sort)
    }
  }

  renderPhotos() {
    const { route, id, store: { currentCollection } } = this.props
    const { sortOptions } = this.state

    const sort = sortOptions.find(item => item.active === true).value
    const collection = currentCollection(id, sort)

    let photos = collection ? [...collection.photos] : []

    if (route === 'home' && photos.length > 10) {
      photos = photos.slice(0, 10)
    }

    return photos.map(photo => <PhotoThumbnail key={photo.id} photo={photo} />)
  }

  onSort(item) {
    const { id, store: { fetchCollection, currentCollection } } = this.props
    const { sortOptions } = this.state

    if (item.active) return false

    let optionsUpdated = [...sortOptions]

    optionsUpdated.find(option => option.id === item.id).active = true
    optionsUpdated.find(option => option.id !== item.id).active = false

    const collection = currentCollection(id, item.value)

    this.setState({
      sortOptions: optionsUpdated
    }, () => (!collection || collection.photos.length < 30) ? fetchCollection(id, 30, item.value) : null)
  }

  renderSortOptions() {
    const { sortOptions } = this.state

    const buttons = sortOptions.map((option, index) => {
      const className = option.active ? css.active : null

      return <button key={index} className={className} onClick={() => this.onSort(option)}>{option.label}</button>
    })

    return (
      <div className={css.sortOptions}>      
        sort: {buttons}
      </div>
    )
  }

  render() {
    const { name, id, route, store: { isFetching } } = this.props

    const title = <h2 className={css.collectionTitle}>{name}</h2>

      return (
        <div className={css.photoPanel}>

          <div className={css.photoPanelTop}>
            {route === 'collection' ? title : <Link to={`/collection/${id}`}>{title}</Link>}   
            {route === 'collection' && this.renderSortOptions()}
          </div>

          <div className={css.photoGrid}>
            {this.renderPhotos()}
          </div>

          {isFetching && <Loader />}
        </div>
      )
  }
}

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
}

export default Collection
