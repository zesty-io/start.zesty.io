import React, { useContext, useEffect, useState } from 'react'
import { Wizard, WizardStep } from '../Wizard'

import { AppStateContext, AppDispatchContext } from '../../context'

import { BuildType } from './components/BuildType'

export default function GettingStarted() {
  const state = useContext(AppStateContext)
  const [build, setBuild] = useState('')

  useEffect(() => {
    console.log('Global state', state)
  }, [])

  return (
    <Wizard defaultStep={state.step}>
      <WizardStep
        labelButtonNext="Create your free account"
        style={{ width: '960px' }}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep>This is an example</WizardStep>
    </Wizard>
  )
}
