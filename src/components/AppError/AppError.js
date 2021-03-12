import React from 'react'

import { Url } from '@zesty-io/core/Url'

import styles from './AppError.less'
export function AppError() {
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
