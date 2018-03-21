import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PhotoThumbnail.scss'

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
    const { photo: { id, likes, urls: { thumb }, user: { name } } } = this.props
    const { showInfo } = this.state

    return (
      <Link to={`/photo/${id}`}>
         <div 
          className='photoItem'
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >

          <img src={thumb} alt={`photo by: ${name}`} />

           {showInfo && 
            <div className='showInfo'>
              <p>{`Photo by: ${name}`}</p>
              <p>{`Number of likes: ${likes}`}</p>
            </div>}
         </div> 
      </Link>
      )
  }
}

export default PhotoThumbnail