import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './../components/Header'
import Collection from './../components/Collection'
import store from './../store/CollectionStore'

class HomePage extends Component {
  renderCollections() {
    const { collections } = this.props
    const route = 'home'

    return collections.map(collection => {
      const { id, name } = collection
      return <Collection store={store} key={id} name={name} id={id} perPage={10} route={route} {...this.props} />
    })
  }

  render() {
    const description = 'Choose a photo collection to explore'
    const route = 'home'

    return (
      <div>
        <Header description={description} route={route} />
        {this.renderCollections()}
      </div>
    )
  }
}

HomePage.propTypes = {
  collections: PropTypes.array.isRequired
}

export default HomePage
