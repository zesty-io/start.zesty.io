import React from 'react'
import cx from 'classnames'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { createBrowserHistory } from 'history'

import { AppProvider } from '../../context'
import { AppError } from './../../components/AppError'
import GettingStarted from '../../components/GettingStarted'

import styles from './App.less'

const history = createBrowserHistory()

if (['stage', 'production'].includes(__CONFIG__.ENV)) {
  Sentry.init({
    release: __CONFIG__.build.data.gitCommit,
    environment: __CONFIG__.ENV,
    integrations: [Sentry.reactRouterV5BrowserTracingIntegration({ history })],
    dsn: 'https://e928b01c4b49662953dd530f249d7b10@o162121.ingest.us.sentry.io/4510229055537152',
    autoSessionTracking: true,
    tracesSampleRate: 1.0,
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
