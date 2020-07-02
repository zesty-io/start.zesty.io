import React, { useEffect, useState } from 'react'

import { Input } from '@zesty-io/core/Input'
import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import cx from 'classnames'
import qs from 'qs'

import styles from './CreateAccount.less'

export function CreateAccount(props) {
  useEffect(() => {
    document.title = 'Accounts: Create an Account'
  }, [])
  return (
    <>
      <h2 className={styles.display}>Now let's create your account</h2>
      <div className={styles.FieldSet}>
        <section className={cx(styles.Signup, styles.bodyText)}>
          <div className={styles.FormWrapper}>
            <header className={styles.Logo}>
              <Url href="https://zesty.io" title="https://zesty.io">
                <img
                  src="https://brand.zesty.io/zesty-io-logo-vertical.png"
                  height="200px"
                  alt="zesty logo"
                />
              </Url>
            </header>
            <main>
              <form
                name="signup"
                className={styles.SignupForm}
                onSubmit={props.createAccount}>
                <label>
                  <p>Email Address</p>
                  <Input
                    required
                    autoFocus
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="e.g. hello@zesty.io"
                    value={props.account[name]}
                    onChange={(name, value) => props.setAccount(name, value)}
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
                    value={props.account[name]}
                    onChange={(name, value) => props.setAccount(name, value)}
                  />
                </label>
                <label>
                  <p>Last Name</p>
                  <Input
                    required
                    className={styles.input}
                    type="text"
                    name="lastName"
                    value={props.account[name]}
                    onChange={(name, value) => props.setAccount(name, value)}
                  />
                </label>
                <label>
                  <p>Password</p>
                  <small>
                    Minimum 8 characters. At least one number. A combination of
                    lower and uppercase letters.
                  </small>
                  <Input
                    required
                    className={styles.input}
                    type="password"
                    name="pass"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
                    value={props.account[name]}
                    onChange={(name, value) => props.setAccount(name, value)}
                  />
                </label>
                <label className={styles.eula}>
                  <Input
                    required
                    className={styles.checkbox}
                    type="checkbox"
                    name="eula"
                    value={props.account[name]}
                    onChange={(name, value) => props.setAccount(name, value)}
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
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                    &nbsp;{props.account.message}
                  </p>
                ) : null}
              </form>
            </main>
            {/* <footer className={styles.Login}>
              <p>Already have an account?</p>
              <AppLink to="/login">Sign In</AppLink>
            </footer> */}
          </div>
        </section>
      </div>
    </>
  )
}
