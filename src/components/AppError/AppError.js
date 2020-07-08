import React, { Component } from 'react'

export class AppError extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerived', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    if (error instanceof Promise) {
      console.log('Error from promise')
    }
    console.log('error', error, errorInfo)
    this.setState({
      hasError: true
    })
  }

  render() {
    console.log('render')
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>
    }

    return this.props.children
  }
}
