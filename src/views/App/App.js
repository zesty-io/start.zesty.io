import React from 'react'
import cx from 'classnames'

import { AppProvider } from '../../context'

import Hello from '../../components/Hello'
import GettingStarted from '../../components/GettingStarted'
import client from '../../api/client'

import styles from './App.less'

export default function App() {
  return (
    <AppProvider>
      <section className={cx(styles.AppShell, styles.bodyText)}>
        <section className={cx('AppMain', styles.AppMain)}>
          <GettingStarted />
        </section>
      </section>
    </AppProvider>
  )
}
