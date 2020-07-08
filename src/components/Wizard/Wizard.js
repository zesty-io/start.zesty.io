import React, { Fragment, useState, useEffect } from 'react'
import cx from 'classnames'

import { Button } from '@zesty-io/core/Button'

import styles from './Wizard.less'
export function Wizard(props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (props.defaultStep) {
      setStep(props.defaultStep)
    }
  }, [props.defaultStep])

  function next(onNext) {
    setStep(step => step + 1)
    if (onNext) onNext()
  }

  function prev() {
    setStep(step => step - 1)
  }

  /**
   * The wizards job is take N steps and determine which step to display. It
   * does so by tracking internal `step` state and then comparing it with the list
   * of children to determine which child node/component to render.
   */

  const child = props.children.length ? props.children[step] : props.children
  // show footer on all but last step
  const showFooter =
    step < props.children.length - 1 && child.props.buttons !== false
  const showPrevButton = step > 0
  const showNextButton = step < props.children.length

  return (
    <div className={styles.WizardLayout}>
      <div className={styles.WizardAligner}>
        <div className={styles.WizardStepWrap} style={child.props.style}>
          {child}
          {showFooter && (
            <div
              className={cx(styles.WizardFooter, {
                [styles.CenteredFooter]: !showPrevButton
              })}>
              {showPrevButton && (
                <Button kind="cancel" onClick={prev} className={styles.Button}>
                  <i className="fa fa-chevron-left" /> Back
                </Button>
              )}
              {showNextButton && (
                <Button
                  className={cx(styles.Button, styles.NextButton)}
                  kind="primary"
                  onClick={() => next(child.props.onNext)}
                  disabled={child.props.locked}>
                  <i className={cx('fa fa-chevron-right', styles.ButtonIcon)} />
                  {child.props.labelButtonNext
                    ? child.props.labelButtonNext
                    : 'Continue'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
