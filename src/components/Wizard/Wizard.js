import React, { useState, useEffect } from 'react'
import cx from 'classnames'

import { Button } from '@zesty-io/core/Button'

import styles from './Wizard.less'
export function Wizard(props) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (props.defaultStep) {
      setCurrentStep(props.defaultStep)
    }
  }, [props.defaultStep])

  function next(onNext) {
    if (onNext) {
      onNext()
    }
    setCurrentStep(currentStep => currentStep + 1)
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
    <section className={styles.Wizard}>
      <div className={styles.WizardSteps}>
        <div className={styles.WaveTop}></div>

        <div style={props.style}>
          {React.cloneElement(child, {
            currentStep: currentStep,
            totalSteps: props.children.length,
            next,
            prev
          })}
        </div>

        <div className={styles.WaveBottom}></div>
      </div>
    </section>
  )
}

export function WizardStep(props) {
  return (
    <div className={styles.WizardStep} style={props.style}>
      {/* Render out the step content */}
      {props.children}

      {/* Determine step actions state */}
      {props.currentStep < props.totalSteps - 1 && props.buttons !== false && (
        <footer
          className={cx(styles.WizardFooter, {
            [styles.CenteredFooter]: !props.showPrevButton
          })}>
          {props.currentStep > 0 && props.showPrevButton !== false && (
            <Button kind="cancel" onClick={props.prev}>
              <i className="fa fa-chevron-left" /> Back
            </Button>
          )}

          {props.currentStep < props.totalSteps && (
            <Button
              kind="primary"
              onClick={() => props.next(props.onNext)}
              disabled={props.locked}>
              <i className="fa fa-chevron-right" />
              {props.labelButtonNext ? props.labelButtonNext : 'Continue'}
            </Button>
          )}
        </footer>
      )}
    </div>
  )
}
