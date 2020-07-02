import React, { useContext, useEffect, useState } from 'react'
import { Wizard, WizardStep } from '../Wizard'

import { AppStateContext, AppDispatchContext } from '../../context'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'

export default function GettingStarted() {
  const { state, dispatch } = useContext(AppStateContext)
  // const dispatch = useContext(AppDispatchContext)
  const [step, setStep] = useState(null)
  const [build, setBuild] = useState('')
  const [account, setAccount] = useState({})

  useEffect(() => {
    console.log('Global state', state)
  }, [])

  function createAccount() {
    dispatch({ type: 'SET_ACCOUNT', payload: account })
  }

  return (
    <Wizard defaultStep={step}>
      <WizardStep
        onNext={() => dispatch({ type: 'SELECT_TYPE', payload: build })}
        labelButtonNext="Create your free account"
        style={{ width: '960px' }}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep onNext={createAccount} style={{ width: '750px' }}>
        <CreateAccount
          account={account}
          setAccount={(type, value) =>
            setAccount({ ...account, [type]: value })
          }
        />
      </WizardStep>

      <WizardStep>This is another example</WizardStep>
    </Wizard>
  )
}
