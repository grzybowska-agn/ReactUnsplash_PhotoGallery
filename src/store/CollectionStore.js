import { observable, action } from 'mobx'
import axios from 'axios'
import SingleCollection from './SingleCollection'

class CollectionStore {
  @observable data = []
  @observable isFetching = false

  constructor() {
    this.currentCollection = this.currentCollection.bind(this)
    this.addCollection = this.addCollection.bind(this)
    this.fetchCollection = this.fetchCollection.bind(this)
  }

  currentCollection(id, sort)  {
    return this.data.find(item => item.id === id && item.sort === sort)
  }

  @action 
  addCollection(collection) {
    this.data.push(collection)
  }

  @action 
  fetchCollection(id, perPage, sort) {
    const collection = this.currentCollection(id, sort)
    const page = collection ? collection.page : 1

    const API_KEY = '22d755333143d59a8861c58102d4002774fa4be5ad94e7adff60a54c2be7efe7'
    const url = `https://api.unsplash.com/collections/${id}/photos?page=${page}&per_page=${perPage}&order_by=${sort}&client_id=${API_KEY}`

    this.isFetching = true

    axios.get(url)
    .then((response) => {
      if (collection) {
        collection.updateCollection(response.data)      
      } else if (!collection) {
        this.addCollection(new SingleCollection(id, sort, response.data))
      }

      this.isFetching = false
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const store = new CollectionStore

export default store