import React, { Component } from 'react'

import styles from './AppError.less'

export function ErrorMessage() {
  return (
    <div className={styles.ErrorContainer}>
      <img
        src="https://financesonline.com/uploads/2019/10/Zesty-io-logo1.png"
        alt="zesty"
      />
      <h1>
        Oh no! Something went wrong. Don't worry it's not your fault. We are
        going to send to an alternate way to{' '}
        <a href="https://accounts.zesty.io/instances/create">
          create an instance
        </a>
        .
      </h1>
    </div>
  )
}

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
    console.log('error', error, errorInfo)
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />
    }

    return this.props.children
  }
}
