import React from 'react'

import { FieldTypeText } from '@zesty-io/core/FieldTypeText'
// import { FieldTypeImage } from '@zesty-io/core/FieldTypeImage'

import styles from './ContentPage.less'

export function ContentPage(props) {
  return (
    <>
      <h2 className={styles.display}>
        Let's set the content of your landing page
      </h2>
      <div className={styles.FieldSet}>
        <FieldTypeText
          className={styles.TextField}
          label="Page Title"
          name="title"
          value={props.page.title}
          onChange={(name, value) => props.setPage(name, value)}
        />
        <FieldTypeText
          className={styles.TextField}
          label="Page Description"
          name="content"
          value={props.page.content}
          onChange={(name, value) => props.setPage(name, value)}
        />
        {/* <FieldTypeImage
              className={styles.TextField}
              name="image"
              onChange={(name, value) => props.setPage(name, value)}
              default={props.page.image}
              label="Upload image"
              limit="1"
            /> */}
      </div>
    </>
  )
}
