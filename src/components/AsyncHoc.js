import React, { Component } from "react"

function asyncComponent(importComponent) {
  class AsyncHoc extends Component {
    constructor() {
      super()
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncHoc
}

export default asyncComponent