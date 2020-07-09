import React from 'react'
import cx from 'classnames'
import ReactJson from 'react-json-view'

import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './JSONPreview.less'

export function JSONPreview(props) {
  return (
    <>
      <div className={styles.PreviewHeader}>
        <p className={styles.title}>Previewing JSON</p>
        <Button className={cx(styles.Button, styles.NextButton)} kind="primary">
          <Url className={styles.link} href={props.dashboardPage}>
            <i className={cx('fa fa-chevron-right', styles.ButtonIcon)} />
            &nbsp; Continue to Dashboard
          </Url>
        </Button>
      </div>
      <div>
        <ReactJson
          src={props.json}
          name={false}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      </div>
    </>
  )
}
