import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import ProgressiveImage from 'react-progressive-image'
import Header from './../components/Header'
import Loader from './../components/Loader'
import css from './PhotoPage.scss'

@observer
class PhotoPage extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    const { currentPhoto, fetchPhoto } = this.props.store

    const photo = currentPhoto(id)

    if (!photo) {
      fetchPhoto(id, false)
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

  onClick(url) {
    window.location = url
  }

  renderPhoto() {
    const { history: { location: { pathname } }, match: { params: { id } } } = this.props
    const { protocol, host } = window.location
    const { currentPhoto } = this.props.store

    const photo = currentPhoto(id)
    const url = protocol + '//' + host + pathname


    if (!photo) return false

    const { downloads, likes, urls: { regular, thumb, raw }, user: { name: user } } = photo

    const loadingStyle = {
      height: '650vh',
      filter: 'blur(3px)' 
    }

    const style = {
      filter: 'none'
    }

    const fbComponent = <div className={css.fbLike} className='fb-like' data-href={url} data-layout='box_count' data-action='like' data-size='small' data-show-faces='true' data-share='true'></div>

    const downloadButton = <button onClick={() => this.onClick(raw)}>{'\u2193'}</button>

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
    const { history: { goBack, length } } = this.props
    const route = 'photo'

    return (
      <div>
        <Header goBack={goBack} route={route} shouldGoBack={length >= 2} />
        <div className={css.photoPage}>
        {this.renderPhoto() || <Loader />}
        </div>
      </div>
    )
  }
}

PhotoPage.propTypes = {
  store: PropTypes.object.isRequired
}

export default PhotoPage
