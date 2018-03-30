import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import PhotoPage from './pages/PhotoPage'
import store from './store/PhotoStore'
import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      collections: [
        {name: 'powerful women', id: 793535},
        {name: 'diverse women', id: 472913},
        {name: 'international women\'s day', id: 884}
      ]
    }
  }
 
  render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={() => <HomePage {...this.state} />} />
              <Route path='/collection/:id' render={props => <CollectionPage {...props} {...this.state} />} />
              <Route path='/photo/:id' render={props => <PhotoPage store={store} {...props} />} />
            </Switch>
          </BrowserRouter>
        </div>
      )
   }
}

export default App
