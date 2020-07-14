import React, { useState, useEffect } from 'react'

import styles from './Wizard.less'
export function Wizard(props) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (props.defaultStep) {
      setCurrentStep(props.defaultStep)
    }
  }, [props.defaultStep])

  function next(onNext) {
    setCurrentStep(currentStep => currentStep + 1)
    if (onNext) onNext()
  }

  function prev() {
    setCurrentStep(currentStep => currentStep - 1)
  }

  /**
   * The wizards job is take N steps and determine which step to display. It
   * does so by tracking internal `step` state and then comparing it with the list
   * of children to determine which child node/component to render.
   */
  const child = props.children.length
    ? props.children[currentStep]
    : props.children

  return (
    <section className={styles.WizardLayout}>
      {React.cloneElement(child, {
        currentStep: currentStep,
        totalSteps: props.children.length,
        next,
        prev
      })}
    </section>
  )
}
