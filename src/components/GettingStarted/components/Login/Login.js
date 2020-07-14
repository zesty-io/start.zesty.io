import React from 'react'
import cx from 'classnames'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'

import styles from './Login.less'
export default function Login(props) {
  return (
    <section className={cx(styles.LoginWrap, styles.bodyText)}>
      <div className={styles.Login}>
        <main className={styles.gridSingle}>
          <form
            name="login"
            className={styles.LoginForm}
            onSubmit={props.login}>
            <div className={styles.FormTitle}>
              <h1 className={styles.subheadline}>Sign In</h1>
            </div>
            <label>
              <i className="far fa-envelope"></i>
              <Input
                tabIndex="1"
                className={styles.loginInput}
                type="text"
                placeholder="Email"
                name="email"
                required={true}
                autoFocus
                value={props.account.email}
                onChange={event =>
                  props.setAccount('email', event.target.value)
                }
              />
            </label>
            <label>
              <i className="fas fa-key"></i>
              <Input
                tabIndex="2"
                className={styles.loginInput}
                placeholder="Password"
                type="password"
                name="pass"
                required={true}
                value={props.account.password}
                onChange={event => {
                  props.setAccount('password', event.target.value)
                }}
              />
            </label>
            {props.account.message ? (
              <p
                className={cx(
                  'error',
                  styles.message,
                  this.state.error ? styles.error : styles.success
                )}>
                {this.state.error ? (
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                ) : (
                  <i className="fa fa-check-circle-o" aria-hidden="true" />
                )}
                &nbsp;
                {props.account.message}
              </p>
            ) : null}
            <div className={styles.loginButtonWrap}>
              <Button
                type="submit"
                name="submit"
                tabIndex="3"
                disabled={props.account.submitted}>
                {props.account.submitted ? (
                  <React.Fragment>
                    <i className="fas fa-spinner"></i>&nbsp;Signing In
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i className="fas fa-sign-in-alt"></i>&nbsp;Sign In
                  </React.Fragment>
                )}
              </Button>
            </div>
          </form>

          <div className={styles.createAccount}>
            <p>Don't have an account?</p>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                props.switchToCreateAccount()
              }}>
              Sign Up
            </a>
          </div>
        </main>
      </div>
    </section>
  )
}
