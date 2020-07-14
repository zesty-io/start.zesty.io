import React from 'react'
import cx from 'classnames'

import { Button } from '@zesty-io/core/Button'

import styles from './WizardStep.less'
export function WizardStep(props) {
  return (
    <div className={styles.WizardStepLayout}>
      <div className={styles.WaveTop}></div>

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

      <div className={styles.WaveBottom}></div>
    </div>
  )
}
