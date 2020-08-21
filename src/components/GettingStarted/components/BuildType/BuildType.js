import React from 'react'
import cx from 'classnames'

import { Card } from '@zesty-io/core/Card'

import styles from './BuildType.less'
export function BuildType(props) {
  return (
    <React.Fragment>
      <header className={styles.GettingStarted}>
        <h2 className={styles.subheadline}>
          <img
            alt="Zesty.io Logo"
            src="https://brand.zesty.io/zesty-io-logo-horizontal.svg"
            height="40px"
          />
          The Cloud CMS for Marketers + Developers
        </h2>
        {/* <h3 className={styles.headline}>Let's get started!</h3> */}
        <p className={styles.bodyText}>
          Let's start by picking the type of sandbox you would like to build
          from the three options shown.
        </p>
        <p className={styles.bodyText}>
          Don't worry if later you change your mind. Once in Zesty.io you can
          always create another sandbox.
        </p>
      </header>

      <main className={styles.Cards}>
        <Card
          onClick={() => props.setBuildType('landingpage')}
          className={cx(
            styles.Option,
            props.buildType === 'landingpage' ? styles.Selected : null
          )}>
          <i className={cx(`far fa-file`, styles.icon)} />
          <h4 className={styles.headline}>Landing Page</h4>
          <p className={styles.bodyText}>
            Starting point for creating a marketing campaign
          </p>
        </Card>
        <Card
          onClick={() => props.setBuildType('corporate')}
          className={cx(
            styles.Option,
            props.buildType === 'corporate' ? styles.Selected : null
          )}>
          <i className={cx(`far fa-copy`, styles.icon)} />
          <h4 className={styles.headline}>Corporate Site</h4>
          <p className={styles.bodyText}>
            Starting point for a long term blog content strategy
          </p>
        </Card>
        <Card
          onClick={() => props.setBuildType('api')}
          className={cx(
            styles.Option,
            props.buildType === 'api' ? styles.Selected : null
          )}>
          <i className={cx(`fas fa-database`, styles.icon)} />
          <h4 className={styles.headline}>Headless</h4>
          <p className={styles.bodyText}>
            Starting point for setting up a headless powered experience
          </p>
        </Card>
      </main>
    </React.Fragment>
  )
}
