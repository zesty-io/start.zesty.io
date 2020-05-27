import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { logout } from '../../store/auth'

import styles from './AppHeader.less'
export default connect(state => {
  const user = state.user

  return { user }
})(
  class AppHeader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userNavOpen: ''
      }
    }

    componentDidMount() {
      document.addEventListener('click', this.closeUserNav)
    }
    componentWillUnmountMount() {
      document.removeEventListener('click', this.closeUserNav)
    }

    render() {
      return (
        <header className={styles.AppHeader}>
          <img
            alt="zesty.io logo"
            className={styles.logo}
            src="https://brand.zesty.io/zesty-io-logo.svg"
          />
          <nav
            ref={nav => (this.userNav = nav)}
            data-test="UserNav"
            className={cx(
              'UserNav',
              styles.UserNav,
              styles[this.state.userNavOpen]
            )}
            onClick={this.toggleUserNav}>
            {this.props.user.firstName} {this.props.user.lastName}
            <img
              alt={`${this.props.user.firstName} ${this.props.user.lastName} Avatar`}
              className={styles.avatar}
              src={`https://www.gravatar.com/avatar/${this.props.user.emailHash}?d=mm&s=30`}
            />
            <ul className={styles.UserMenu} id="userNavDropdown">
              <li className={styles.user}>
                <span className={styles.email}>{this.props.user.email}</span>
              </li>

              <hr />

              <li>
                <NavLink to="/settings/account" data-test="accountNavLink">
                  <i className="fa fa-cog" aria-hidden="true" />
                  &nbsp;My Account
                </NavLink>
              </li>

              <li>
                <NavLink to="/support" data-test="supportNavLink">
                  <i className="far fa-life-ring"></i>&nbsp;Support
                </NavLink>
              </li>

              <hr />

              <li className={styles.logout}>
                <NavLink to="/logout" data-test="logoutNavLink">
                  <i className="fas fa-sign-out-alt"></i>
                  &nbsp;Sign Out
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )
    }

    toggleUserNav = evt => {
      this.setState({
        userNavOpen: this.state.userNavOpen === 'show' ? '' : 'show'
      })
    }

    closeUserNav = evt => {
      if (this.state.userNavOpen) {
        const parent = evt.target.closest('.UserNav')
        if (!parent || parent !== this.userNav) {
          this.setState({
            userNavOpen: ''
          })
        }
      }
    }
  }
)
