import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import css from './Header.scss'

class Header extends Component {
  static defaultProps = {
      title: 'Gallery powered by Unsplash',
      description: '\u27F5 Go back',
      shouldGoBack: true,
      goBack: null
  }

  render() {
    const { title, description, goBack, shouldGoBack, route } = this.props
    const isHomePage = (route === 'home')

    const styleTitle = {
      textDecoration: 'none'
    }

    const styleNoLink = {
      cursor: 'unset'
    }

    const styleVisible = {
      cursor: 'pointer',
      textDecoration: 'underline'
    }

    const styleHidden = {
      visibility: 'hidden'
    }

    const styleDescription = isHomePage ? styleNoLink : (shouldGoBack ? styleVisible : styleHidden) 

    return (
      <header>
        <Link to={'/'} style={styleTitle}>
          <h1>{title}</h1>
        </Link>
        <p onClick={goBack} style={styleDescription}>{description}</p>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  route: PropTypes.string.isRequired,
  goBack: PropTypes.func,
  shouldGoBack: PropTypes.bool
}

export default Header