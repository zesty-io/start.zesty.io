import React from 'react'

import { FieldTypeText } from '@zesty-io/core/FieldTypeText'

import styles from './CreateAccount.less'

export function CreateAccount(props) {
  return (
    <>
      <h2 className={styles.display}>Now let's create your account</h2>
      <div className={styles.FieldSet}>
        <FieldTypeText
          className={styles.TextField}
          label="Email"
          name="email"
          value={props.account[name]}
          onChange={(name, value) => props.setAccount(name, value)}
        />
        <FieldTypeText
          className={styles.TextField}
          label="First Name"
          name="firstName"
          value={props.account[name]}
          onChange={(name, value) => props.setAccount(name, value)}
        />
        <FieldTypeText
          className={styles.TextField}
          label="Last Name"
          name="lastName"
          value={props.account[name]}
          onChange={(name, value) => props.setAccount(name, value)}
        />
        <FieldTypeText
          className={styles.TextField}
          label="Last Name"
          name="lastName"
          value={props.account[name]}
          onChange={(name, value) => props.setAccount(name, value)}
        />
        <FieldTypeText
          className={styles.TextField}
          label="Password"
          name="password"
          value={props.account[name]}
          onChange={(name, value) => props.setAccount(name, value)}
        />
      </div>
    </>
  )
}
