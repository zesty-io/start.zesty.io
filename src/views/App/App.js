import React from 'react'
import cx from 'classnames'
import { hot } from 'react-hot-loader/root'

import { AppProvider } from '../../context'
import { AppError } from './../../components/AppError'

import GettingStarted from '../../components/GettingStarted'
import client from '../../api/client'

import styles from './App.less'
function App() {
  return (
    <AppProvider>
      <AppError>
        <section className={cx(styles.AppShell, styles.bodyText)}>
          <section className={cx('AppMain', styles.AppMain)}>
            <GettingStarted />
          </section>
        </section>
      </AppError>
    </AppProvider>
  )
}

export default hot(App)
