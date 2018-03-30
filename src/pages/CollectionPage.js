import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './../components/Header'
import CollectionPreview from './../components/CollectionPreview'

class CollectionPage extends Component {
  renderCollection() {
    const { collections, match: { params: { id } } } = this.props
    const name = collections.find(item => item.id === parseInt(id)).name
    const route = 'collection'

    return <CollectionPreview name={name} id={parseInt(id)} perPage={40} route={route} {...this.props} />
  }

  render() {
    const { history: { goBack, length } } = this.props
    const route = 'collection'

    return (
      <div>
        <Header goBack={goBack} shouldGoBack={length >= 2} route={route} />
        {this.renderCollection()}
      </div>
    )
  }
}

CollectionPage.propTypes = {
  collections: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  fetchMoreOnScroll: PropTypes.func.isRequired
}

export default CollectionPage
