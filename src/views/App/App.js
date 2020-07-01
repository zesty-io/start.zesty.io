import React from 'react'
import cx from 'classnames'

import Hello from '../../components/Hello'

import styles from './App.less'

export default function App() {
  console.trace()
  return (
    <section className={cx(styles.AppShell, styles.bodyText)}>
      <section className={cx('AppMain', styles.AppMain)}>
        <Hello />
      </section>
    </section>
  )
}
