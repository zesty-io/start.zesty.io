import React, { Component } from 'react'

import styles from './AppError.less'

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
      return (
        <div className={styles.ErrorContainer}>
          <div>
            <img
              src="https://financesonline.com/uploads/2019/10/Zesty-io-logo1.png"
              alt="zest"
            />
            <h1>Something went wrong</h1>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
