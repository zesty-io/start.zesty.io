import React from 'react'
import cx from 'classnames'

import { AppProvider } from '../../context'

import Hello from '../../components/Hello'
import GettingStarted from '../../components/GettingStarted'
import client from '../../api/client'

import styles from './App.less'

import Auth from '../../api/auth'
import Accounts from '../../api/accounts'

window.Auth = Auth
window.Accounts = Accounts

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
