import React, { Component } from 'react'

import { Url } from '@zesty-io/core/Url'

import styles from './AppError.less'
export function ErrorMessage() {
  const accountsURL = 'https://accounts.zesty.io/instances/create'

  setTimeout(() => {
    window.location = accountsURL
  }, 6000)

  return (
    <div className={styles.ErrorContainer}>
      <img
        alt="Zesty.io Logo"
        src="https://brand.zesty.io/zesty-io-logo-horizontal.svg"
        height="60px"
      />
      <p className={styles.headline}>
        Oh no! Something went wrong. Don't worry it's not your fault. We are
        going to redirect you to an alternative way to{' '}
        <Url href={accountsURL}>create a sandbox</Url>
      </p>
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
