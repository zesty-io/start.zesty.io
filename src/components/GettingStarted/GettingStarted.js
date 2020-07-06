import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import randomWords from 'random-words'

import { Wizard, WizardStep } from '../Wizard'

import { AppStateContext } from '../../context'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'
import { SiteCreated } from './components/SiteCreated'
import { ContentPage } from './components/ContentPage'

import Auth from '../../api/auth'
import Accounts from '../../api/accounts'
import Manager from '../../api/manager'

export default function GettingStarted() {
  const { state, dispatch } = useContext(AppStateContext)
  const [step, setStep] = useState(null)
  const [build, setBuild] = useState('')
  const [account, setAccount] = useState({
    message: '',
    submitted: false,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    eula: false
  })

  const [page, setPage] = useState({
    title: '',
    description: '',
    image: []
  })

  useEffect(() => {
    console.log('Global state', state)
  }, [])

  async function createAccount(e) {
    e.preventDefault()

    await Accounts.createAccount({
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      password: account.password
    })
    console.log('created account')
    dispatch({ type: 'SET_ACCOUNT', payload: account })
    setStep(2)

    await login()
    const instanceHash = await createInstance()
    const instance = Manager(instanceHash)
    await pingInstance(instance)
    console.log('instance populated')
  }

  async function login() {
    const {
      meta: { token }
    } = await Auth.login({ email: account.email, password: account.password })
    console.log('logged in')

    Cookies.set(__CONFIG__.COOKIE_NAME, token, {
      path: '/',
      domain: __CONFIG__.COOKIE_DOMAIN
    })
  }

  async function createInstance() {
    const {
      data: { randomHashID }
    } = await Accounts.createInstance({
      name: randomWords({ exactly: 3, join: ' ' })
    })
    console.log('created instance')
    return randomHashID
  }

  async function pingInstance(instance) {
    console.log('pinging instance')
    return await instance.get()
  }

  return (
    <Wizard defaultStep={step}>
      <WizardStep
        onNext={() => dispatch({ type: 'SELECT_TYPE', payload: build })}
        labelButtonNext="Create your free account"
        style={{ width: '960px' }}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep style={{ width: '750px' }} buttons={false}>
        <CreateAccount
          account={account}
          setAccount={(type, value) =>
            setAccount({ ...account, [type]: value })
          }
          createAccount={createAccount}
        />
      </WizardStep>

      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://i.ytimg.com/vi/1qjPIMfD7_M/maxresdefault.jpg"
          title="Schema"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://madewithnetwork.ams3.cdn.digitaloceanspaces.com//spatie-space-production/3212/zesty-io-2.jpg"
          title="Content"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://cdn0.capterra-static.com/screenshots/2101737/18986.png"
          title="Code"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>

      <WizardStep
        onNext={() => dispatch({ type: 'SET_PAGE', payload: page })}
        style={{ width: '960px' }}
        labelButtonNext="Preview landing page">
        <ContentPage
          page={page}
          setPage={(type, value) => {
            setPage({ ...page, [type]: value })
          }}
        />
      </WizardStep>
      <WizardStep></WizardStep>
    </Wizard>
  )
}
