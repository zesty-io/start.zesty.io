import React from 'react'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './CreateAccount.less'

export function CreateAccount(props) {
  return (
    <>
      <form
        name="signup"
        className={styles.SignupForm}
        onSubmit={props.createAccount}>
        <header className={styles.CreateAccount}>
          <h2 className={styles.headline}>Create your account</h2>
          <p className={styles.bodyText}>
            Once your account is created we will automatically create your
            selected content sandbox.
          </p>
        </header>

        <label>
          <p>Email Address</p>
          <Input
            required
            autoFocus
            className={styles.input}
            type="email"
            name="email"
            placeholder="e.g. hello@zesty.io"
            value={props.account.email}
            onChange={event => props.setAccount('email', event.target.value)}
          />
        </label>
        <label>
          <p>First Name</p>
          <Input
            required
            className={styles.input}
            type="text"
            name="firstName"
            placeholder="Zesty"
            value={props.account.firstName}
            onChange={event => {
              props.setAccount('firstName', event.target.value)
            }}
          />
        </label>
        <label>
          <p>Last Name</p>
          <Input
            required
            className={styles.input}
            type="text"
            name="lastName"
            value={props.account.lastName}
            onChange={event => props.setAccount('lastName', event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <small>
            Minimum 8 characters. At least one number. A combination of lower
            and uppercase letters.
          </small>
          <Input
            required
            className={styles.input}
            type="password"
            name="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
            value={props.account.password}
            onChange={event => props.setAccount('password', event.target.value)}
          />
        </label>
        <label className={styles.eula}>
          <Input
            required
            className={styles.checkbox}
            type="checkbox"
            name="eula"
            value={props.account.eula}
            onChange={event => props.setAccount('eula', event.target.value)}
          />
          <span>
            I have read and agree to the{' '}
            <Url
              href="https://www.zesty.io/en-us/about/end-user-license-agreement/"
              target="_blank">
              <abbr title="End User License Agreement">EULA</abbr>
            </Url>
          </span>
        </label>

        <div className={styles.Actions}>
          <Button
            type="submit"
            name="submit"
            disabled={props.account.submitted}>
            {props.account.submitted ? (
              <React.Fragment>
                <i className="fas fa-hourglass" aria-hidden="true" />
                &nbsp;Creating Your Account
              </React.Fragment>
            ) : (
              <React.Fragment>
                <i className="fas fa-plus" aria-hidden="true" />
                &nbsp;Create Your Account
              </React.Fragment>
            )}
          </Button>
        </div>

        {props.account.message ? (
          <p className={styles.error}>
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            &nbsp;{props.account.message}
          </p>
        ) : null}
      </form>
    </>
  )
}
