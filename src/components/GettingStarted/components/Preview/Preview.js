import React from 'react'
import ReactJson from 'react-json-view'

import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './Preview.less'
export function Preview(props) {
  return (
    <div className={styles.Preview}>
      <header>
        <p className={styles.subtitle}>Viewing {props.previewURL}</p>
        <Url href={props.managerURL}>
          <Button kind="save">
            <i className="fa fa-chevron-right" />
            &nbsp;Continue to Dashboard
          </Button>
        </Url>
      </header>

      {props.type === 'website' && (
        <iframe src={props.previewURL} width="100%" height="650px"></iframe>
      )}
      {props.type === 'api' && (
        <ReactJson
          src={props.json}
          name={false}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      )}
    </div>
  )
}
