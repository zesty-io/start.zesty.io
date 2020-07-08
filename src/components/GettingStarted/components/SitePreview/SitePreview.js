import React from 'react'
import cx from 'classnames'

import { Button } from '@zesty-io/core/Button'

import styles from './SitePreview.less'

export function SitePreview(props) {
  return (
    <>
      <div className={styles.PreviewHeader}>
        <p className={styles.title}>Previewing {props.previewPage}</p>
        <Button
          className={cx(styles.Button, styles.NextButton)}
          kind="primary"
          onClick={() => {
            window.location.href = props.dashboardPage
          }}>
          <i className={cx('fa fa-chevron-right', styles.ButtonIcon)} />
          Continue to Dashboard
        </Button>
      </div>
      <iframe src={props.previewPage} width="100%" height="650px"></iframe>
    </>
  )
}
