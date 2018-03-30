import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PhotoThumbnail from './PhotoThumbnail'
import Loader from './Loader'
import css from './CollectionPreview.scss'

class CollectionPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: props.data.find(item => item.id === props.id) ? [...props.data.find(item => item.id === props.id).photos] : [],
      sortOptions: [
        {id: 1, label: 'latest', value: 'latest', active: true},
        {id: 2, label: 'most popular', value: 'popular', active: false}
      ]
    }

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    const { data, fetchCollection, fetchMoreOnScroll, id, perPage, route } = this.props
    const dataAlreadyFetched = data.find(item => item.id === id)

    if (!dataAlreadyFetched || (dataAlreadyFetched.canFetchMore && (route === 'collection'))) {
      fetchCollection(id, perPage)
    }

    if (route === 'collection') {
      document.addEventListener('scroll', this.onScroll)
    }
  }

  componentWillUnmount() {
    const { fetchMoreOnScroll, route } = this.props

    if (route === 'collection') {
      document.removeEventListener('scroll', this.onScroll)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, fetchMoreOnScroll, route, data } = this.props
    const { photos } = this.state

    const next = {...nextProps.data.find(item => item.id === id)}
    const current = {...data.find(item => item.id === id)}

    if (current.canFetchMore && (next.canFetchMore !== current.canFetchMore)) {
      document.removeEventListener('scroll', this.onScroll)
    }

    if (!next.photos) {
      return false
    }

    if ((next.photos.length > photos.length) || (next.photos[0].id !== photos[0].id)) {
      this.setState({
        photos: [...next.photos]
      })
    }
  }

  onScroll() {
    const { id, fetchMoreOnScroll } = this.props
    fetchMoreOnScroll(id)
  }

  renderPhotos() {
    const { route } = this.props
    const { photos } = this.state

    const photosToRender = (route === 'home' && photos.length > 10) ? photos.slice (0, 10) : photos

    return photosToRender.map(photo => <PhotoThumbnail key={photo.id} photo={photo} />)
  }

  onSort(item) {
    const { id, fetchCollection } = this.props
    const { sortOptions } = this.state

    if (item.active) return false

    let optionsUpdated = [...sortOptions]

    optionsUpdated.find(option => option.id === item.id).active = true
    optionsUpdated.find(option => option.id !== item.id).active = false

    this.setState({
      sortOptions: optionsUpdated
    }, () => fetchCollection(id, 40, true, item.value))
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
    const { name, id, isFetching, route } = this.props
    const { photos } = this.state

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

CollectionPreview.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  fetchMoreOnScroll: PropTypes.func,
  isFetching: PropTypes.bool.isRequired
}

export default CollectionPreview