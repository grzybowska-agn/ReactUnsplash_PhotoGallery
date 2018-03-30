import { observable, action } from 'mobx'
import axios from 'axios'

class PhotoStore {
  @observable data = []
  @observable isFetching = false

  constructor() {
    this.currentPhoto = this.currentPhoto.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.fetchPhoto = this.fetchPhoto.bind(this)
  }

  currentPhoto(id)  {
    return this.data.find(item => item.id === id)
  }

  @action 
  addPhoto(data) {
    this.data.push(data)
  }

  @action 
  fetchPhoto(id) {
    const API_KEY = '22d755333143d59a8861c58102d4002774fa4be5ad94e7adff60a54c2be7efe7'
    const url = `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`

    this.isFetching = true

    axios.get(url)
      .then((response) => {
        this.addPhoto(response.data)
        this.isFetching = false
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const store = new PhotoStore

export default store