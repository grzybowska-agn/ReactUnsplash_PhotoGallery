import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import asyncComponent from './components/AsyncHoc'
import store from './store/PhotoStore'
import './App.scss'

const HomePage = asyncComponent(() => import('./pages/HomePage'))
const CollectionPage = asyncComponent(() => import('./pages/CollectionPage'))
const PhotoPage = asyncComponent(() => import('./pages/PhotoPage'))

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
