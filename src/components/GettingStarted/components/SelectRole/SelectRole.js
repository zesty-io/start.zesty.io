import React from 'react'
import cx from 'classnames'

import { Card } from '@zesty-io/core/Card'

import styles from './SelectRole.less'
export function SelectRole(props) {
  return (
    <React.Fragment>
      <header className={styles.GettingStarted}>
        <h2 className={styles.headline}>What are you responsible for?</h2>
      </header>

      <main className={styles.Cards}>
        <Card
          onClick={() => props.setRole('developer')}
          className={cx(
            styles.Card,
            props.role === 'developer' ? styles.Selected : null
          )}>
          <h4 className={styles.headline}>Development</h4>
        </Card>
        <Card
          onClick={() => props.setRole('marketer')}
          className={cx(
            styles.Card,
            props.role === 'marketer' ? styles.Selected : null
          )}>
          <h4 className={styles.headline}>Marketing</h4>
        </Card>
        <Card
          onClick={() => props.setRole('content')}
          className={cx(
            styles.Card,
            props.role === 'content' ? styles.Selected : null
          )}>
          <h4 className={styles.headline}>Content</h4>
        </Card>
        <Card
          onClick={() => props.setRole('architect')}
          className={cx(
            styles.Card,
            props.role === 'architect' ? styles.Selected : null
          )}>
          <h4 className={styles.headline}>Architecture</h4>
        </Card>
        <Card
          onClick={() => props.setRole('manager')}
          className={cx(
            styles.Card,
            props.role === 'manager' ? styles.Selected : null
          )}>
          <h4 className={styles.headline}>Management</h4>
        </Card>
      </main>
    </React.Fragment>
  )
}
