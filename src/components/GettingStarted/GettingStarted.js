import React, { useContext, useEffect, useState } from 'react'
import { Wizard, WizardStep } from '../Wizard'

import { AppStateContext, AppDispatchContext } from '../../context'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'
import { SiteCreated } from './components/SiteCreated'
import { ContentPage } from './components/ContentPage'

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
    pass: '',
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

  function createAccount(e) {
    e.preventDefault()
    dispatch({ type: 'SET_ACCOUNT', payload: account })
    setStep(2)
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
