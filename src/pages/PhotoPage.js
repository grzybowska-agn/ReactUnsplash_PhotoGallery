import React, { Component } from 'react'
import axios from 'axios'
import ProgressiveImage from 'react-progressive-image'
import Header from './../components/Header'
import Loader from './../components/Loader'
import css from './PhotoPage.scss'

class PhotoPage extends Component {
  constructor() {
    super()
    this.state = {
      photo: null
    }

    this.fetchPhoto = this.fetchPhoto.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { photo } = this.state

    if (!photo) {
      this.fetchPhoto(id, false)
    }

    this.fbLoadApi()
  }

  fbLoadApi() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = "//connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function() {
      FB.init({
          appId      : '115517331888071',
          cookie     : true,
          xfbml      : true, 
          version    : 'v2.5'
      });
    }.bind(this)
  }

  fetchPhoto(param, download = false) {
    const API_KEY = '22d755333143d59a8861c58102d4002774fa4be5ad94e7adff60a54c2be7efe7'
    const url = `https://api.unsplash.com/photos/${download ? (param + '/download') : param}?client_id=${API_KEY}`

    axios.get(url)
      .then((response) => {
        if (download) {
          window.location = response.data.url
          return
        }
        this.setState({
          photo: {...response.data}
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderPhoto() {
    const { photo, fbLoadApi } = this.state
    const { history: { location: { pathname } } } = this.props
    const { protocol, host } = window.location

    const url = protocol + '//' + host + pathname

    const { 
      id, created_at: date, downloads, likes, description, width, height,
      urls: { regular, thumb }, user: { name: user, bio, location }
    } = photo 

    const loadingStyle = {
      height: '650vh',
      filter: 'blur(3px)'
    }

    const style = {
      filter: 'none'
    }

    const fbComponent = <div className={css.fbLike} className='fb-like' data-href={url} data-layout='box_count' data-action='like' data-size='small' data-show-faces='true' data-share='true'></div>

    const downloadButton = <button onClick={() => this.fetchPhoto(id, true)}>{'\u2193'}</button>

    return (
      <div className={css.photoContainer}>
        <div className={css.photoDetails}>    
        {fbComponent}           
          <div className={css.infos}>
            <p>Photo by {user}</p>
            <p>Downloads: {downloads} </p>
          </div>
          <div className={css.downloadButton}>{downloadButton}</div>
        </div>

        <ProgressiveImage src={regular} placeholder={thumb}>
          {(src, loading) => (
            <img style={loading ? loadingStyle : style} src={src} alt={`Photo by ${user}`} />
          )}
        </ProgressiveImage>
      </div>
    )
  }

  render() {
    const { photo } = this.state
    const { history: { goBack, length } } = this.props
    const route = 'photo'

    return (
      <div>
        <Header goBack={goBack} route={route} shouldGoBack={length >= 2} />
        <div className={css.photoPage}>
        {photo ? this.renderPhoto() : <Loader />}
        </div>
      </div>
    )
  }
}

export default PhotoPage
