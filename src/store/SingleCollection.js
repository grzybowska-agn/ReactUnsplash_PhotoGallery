import { observable, action } from 'mobx'

class SingleCollection {
  @observable photos

  constructor(id, sort, data) {
    this.id = id
    this.page = data.length > 10 ? 2 : 1
    this.sort = sort
    this.photos = data
    this.canFetchMore = true
    this.updateCollection = this.updateCollection.bind(this)
  }

  @action 
  updateCollection(data) {
    this.canFetchMore = Boolean(data.length)

    if (!this.canFetchMore) return false

    this.page ++
    if (this.photos.length > 10) {
      this.photos.push(...data)
    } else {
      this.photos.replace(data)
    }
  }
}

export default SingleCollection