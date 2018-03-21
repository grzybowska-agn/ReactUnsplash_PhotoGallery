import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import PhotoPage from './pages/PhotoPage'
import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      collections: [
        {name: 'powerful women', id: 793535},
        {name: 'diverse women', id: 472913},
        {name: 'international women\'s day', id: 884}
      ],
      data: [],
      isFetching: false,
      sort: 'latest'
    }

    this.fetchCollection = this.fetchCollection.bind(this)
    this.fetchMoreOnScroll = this.fetchMoreOnScroll.bind(this)
  }

  fetchCollection(id, perPage, resetPage = false, sort = this.state.sort) {
    const { data } = this.state
    const thisCollectionData = data.find(item => item.id === id) || null
    const page = (thisCollectionData && !resetPage) ? thisCollectionData.page : 1

    const API_KEY = '22d755333143d59a8861c58102d4002774fa4be5ad94e7adff60a54c2be7efe7'
    const url = `https://api.unsplash.com/collections/${id}/photos?page=${page}&per_page=${perPage}&order_by=${sort}&client_id=${API_KEY}`

    axios.get(url)
      .then((response) => {
        const sortChange = (sort !== this.state.sort)
        const isMoreAvailable = Boolean(response.data && response.data.length)
        let dataUpdated = thisCollectionData ? data.filter(item => item.id === id) : data

        dataUpdated = [{
          id: id,
          page: (perPage > 10) ? page + 1 : 1,
          photos: (thisCollectionData && !sortChange) ? [...thisCollectionData.photos, ...response.data] : [...response.data],
          canFetchMore: isMoreAvailable
        }, ...dataUpdated]

        this.setState({
          data: [...dataUpdated],
          isFetching: false,
          sort: sort
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchMoreOnScroll(id) {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight)  {
      const { isFetching } = this.state
      
      if (isFetching) return false

      this.setState({ 
          isFetching: true 
      }, () => this.fetchCollection(id, 40))     
    }
  }
 
  render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route 
                exact path='/' 
                render={() => <HomePage 
                  {...this.state} 
                  fetchCollection={this.fetchCollection} 
                />} 
              />
              <Route 
                path='/collection/:id' 
                render={props => <CollectionPage 
                  {...props} 
                  {...this.state} 
                  fetchCollection={this.fetchCollection} 
                  fetchMoreOnScroll={this.fetchMoreOnScroll} 
                />} 
              />
              <Route 
                path='/photo/:id' 
                render={props => <PhotoPage {...props} />} 
              />
            </Switch>
          </BrowserRouter>
        </div>
      )
   }
}

export default App