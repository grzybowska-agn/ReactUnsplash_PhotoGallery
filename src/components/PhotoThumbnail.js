import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import css from './PhotoThumbnail.scss'

class PhotoThumbnail extends Component {
  constructor() {
    super()
    this.state = {
      showInfo: false
    }
  }

  onMouseEnter() {
    this.setState({ 
      showInfo: true
    })
  }

  onMouseLeave() {
    this.setState({
      showInfo: false
    })
  }

  render() {
    const { photo, photo: { id, likes, urls: { thumb }, user: { name } } } = this.props
    const { showInfo } = this.state


    if (!photo) {
      return false
    }

    return (
      <Link to={`/photo/${id}`}>
         <div 
          className={css.photoItem}
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >
          <LazyLoad height={200}>
            <img src={thumb} alt={`photo by: ${name}`} />
          </LazyLoad>
           {showInfo && 
            <div className={css.showInfo}>
              <p>{`Photo by: ${name}`}</p>
              <p>{`Number of likes: ${likes}`}</p>
            </div>}
         </div> 
      </Link>
      )
  }
}

PhotoThumbnail.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoThumbnail
