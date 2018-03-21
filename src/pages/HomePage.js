import React, { Component } from 'react'
import Header from './../components/Header'
import CollectionPreview from './../components/CollectionPreview'


class HomePage extends Component {
  renderCollections() {
    const { collections } = this.props
    const route = 'home'

    return collections.map(collection => {
      const { id, name } = collection
      return <CollectionPreview key={id} name={name} id={id} perPage={10} route={route} {...this.props} />
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

export default HomePage