import React from 'react'
import cx from 'classnames'

import { Card } from '@zesty-io/core/Card'

import styles from './SelectRole.less'
export function SelectRole(props) {
  return (
    <React.Fragment>
      <header className={styles.GettingStarted}>
        <h2 className={styles.subheadline}>What is your role?</h2>
        {/* <p className={styles.bodyText}>
          By selecting your role we
        </p> */}
      </header>

      <main className={styles.Cards}>
        <Card
          onClick={() => props.setRole('developer')}
          className={cx(
            styles.Card,
            props.role === 'developer' ? styles.Selected : null
          )}>
          {/* <i className={cx(`far fa-file`, styles.icon)} /> */}
          <h4 className={styles.headline}>Developer</h4>
          {/* <p className={styles.bodyText}>
            Starting point for creating a marketing campaign
          </p> */}
        </Card>
        <Card
          onClick={() => props.setRole('marketer')}
          className={cx(
            styles.Card,
            props.role === 'marketer' ? styles.Selected : null
          )}>
          {/* <i className={cx(`far fa-copy`, styles.icon)} /> */}
          <h4 className={styles.headline}>Marketer</h4>
          {/* <p className={styles.bodyText}>
            Starting point for a long term blog content strategy
          </p> */}
        </Card>
        <Card
          onClick={() => props.setRole('author')}
          className={cx(
            styles.Card,
            props.role === 'author' ? styles.Selected : null
          )}>
          {/* <i className={cx(`fas fa-database`, styles.icon)} /> */}
          <h4 className={styles.headline}>Author</h4>
          {/* <p className={styles.bodyText}>
            Starting point for setting up a headless powered experience
          </p> */}
        </Card>
        <Card
          onClick={() => props.setRole('architect')}
          className={cx(
            styles.Card,
            props.role === 'architect' ? styles.Selected : null
          )}>
          {/* <i className={cx(`fas fa-database`, styles.icon)} /> */}
          <h4 className={styles.headline}>Architect</h4>
          {/* <p className={styles.bodyText}>
            Starting point for setting up a headless powered experience
          </p> */}
        </Card>
        <Card
          onClick={() => props.setRole('manager')}
          className={cx(
            styles.Card,
            props.role === 'manager' ? styles.Selected : null
          )}>
          {/* <i className={cx(`fas fa-database`, styles.icon)} /> */}
          <h4 className={styles.headline}>Manager</h4>
          {/* <p className={styles.bodyText}>
            Starting point for setting up a headless powered experience
          </p> */}
        </Card>
      </main>
    </React.Fragment>
  )
}
