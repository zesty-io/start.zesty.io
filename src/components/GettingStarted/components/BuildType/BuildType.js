import React from 'react'
import cx from 'classnames'

import { Card } from '@zesty-io/core/Card'

import styles from './BuildType.less'
export function BuildType(props) {
  return (
    <React.Fragment>
      <header className={styles.GettingStarted}>
        <h2 className={styles.headline}>Get started with Zesty.io</h2>
        <h3 className={styles.subheadline}>
          A web hosted Content Management System (CMS)
        </h3>
        <p className={styles.bodyText}>
          We will start by picking the type of content you would like to build
          from the three options shown.
        </p>
        <p className={styles.bodyText}>
          Don't worry if you change your mind later. Once in Zesty.io you can
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
          <h2 className={styles.headline}>Landing page</h2>
          {/* <p className={styles.subheadline}>
            e.g. About Us page, Contact Us page
          </p> */}
        </Card>
        <Card
          onClick={() => props.setBuildType('corporate')}
          className={cx(
            styles.Option,
            props.buildType === 'corporate' ? styles.Selected : null
          )}>
          <i className={cx(`far fa-copy`, styles.icon)} />
          <h2 className={styles.headline}>Corporate blog</h2>
          {/* <p className={styles.subheadline}>
            e.g. Articles, Team member profiles
          </p> */}
        </Card>
        <Card
          onClick={() => props.setBuildType('api')}
          className={cx(
            styles.Option,
            props.buildType === 'api' ? styles.Selected : null
          )}>
          <i className={cx(`fas fa-database`, styles.icon)} />
          <h2 className={styles.headline}>API</h2>
          {/* <p className={styles.subheadline}>
            e.g. app content, mobile navigation, category tags
          </p> */}
        </Card>
      </main>
    </React.Fragment>
  )
}
