import React, { Component, useEffect } from 'react'
import cx from 'classnames'

import styles from './Login.less'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

export default function Login(props) {
  // constructor(props) {
  //   super()
  //   this.state = {
  //     error: false,
  //     submitted: false,
  //     logoUrl:
  //     message: ''
  //   }
  // }
  useEffect(() => {
    document.title = 'Accounts: Login'
  }, [])
  return (
    <section className={cx(styles.LoginWrap, styles.bodyText)}>
      <div className={styles.Login}>
        <header>
          <Url href="https://www.zesty.io" title="https://www.zesty.io">
            <img
              alt="Zesty.io Logo"
              src="https://brand.zesty.io/zesty-io-logo-vertical.png"
              height="200px"
            />
          </Url>
        </header>

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

//   handleLogin = evt => {
//     evt.preventDefault()

//     this.setState({
//       submitted: true
//     })

//     this.props
//       .dispatch(
//         login(document.forms.login.email.value, document.forms.login.pass.value)
//       )
//       .then(json => {
//         if (json.code === 200) {
//           // handle workflow redirect
//           const queryParams = qs.parse(window.location.search.substr(1))
//           if (queryParams.redirect) {
//             if (
//               queryParams.redirect.split('.')[2] === 'zesty' ||
//               queryParams.redirect.split('.')[2] === 'zestyio'
//             ) {
//               this.setState({
//                 error: false,
//                 submitted: false,
//                 message: 'Redirecting'
//               })
//               window.location = queryParams.redirect + window.location.hash
//             } else {
//               this.setState({
//                 error: true,
//                 submitted: false,
//                 message: 'The redirect provided is not allowed. Check your URL.'
//               })
//             }
//           } else {
//             this.props.history.push('/instances')
//           }
//         } else if (json.code === 202) {
//           this.props.history.push('/login/2fa')
//         } else {
//           this.setState({
//             error: true,
//             submitted: false,
//             message: 'There was a problem signing you in'
//           })
//           this.props.dispatch({
//             type: 'FETCH_AUTH_ERROR',
//             auth: false
//           })
//         }
//       })
//       .catch(err => {
//         console.error(err)
//         if (err === 403) {
//           this.setState({
//             error: true,
//             submitted: false,
//             message: 'Too many failed login attempts'
//           })
//         } else {
//           this.setState({
//             error: true,
//             submitted: false,
//             message: 'There was a problem signing you in'
//           })
//         }
//       })
//   }
// }
