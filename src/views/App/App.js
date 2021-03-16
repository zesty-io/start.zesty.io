import React from 'react'
import cx from 'classnames'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { AppProvider } from '../../context'
import { AppError } from './../../components/AppError'
import GettingStarted from '../../components/GettingStarted'

import styles from './App.less'

if (['stage', 'production'].includes(__CONFIG__.ENV)) {
  Sentry.init({
    release: __CONFIG__.build.data.gitCommit,
    environment: __CONFIG__.ENV,
    integrations: [new Integrations.BrowserTracing()],
    dsn:
      'https://9e46029d4aef4ae2a4f31c4bd13ddc77@o162121.ingest.sentry.io/5673717',
    autoSessionTracking: true,
    tracesSampleRate: 1.0
  })
}

function App() {
  return (
    <AppProvider>
      <Sentry.ErrorBoundary fallback={() => <AppError />}>
        <section className={cx(styles.AppShell, styles.bodyText)}>
          <section className={cx('AppMain', styles.AppMain)}>
            <GettingStarted />
          </section>
        </section>
      </Sentry.ErrorBoundary>
    </AppProvider>
  )
}

export default App
