import React from 'react'

import { Button } from '@zesty-io/core/Button'
import { FieldTypeText } from '@zesty-io/core/FieldTypeText'
// import { FieldTypeImage } from '@zesty-io/core/FieldTypeImage'

import styles from './ContentPage.less'

export function ContentPage(props) {
  return (
    <>
      <h2 className={styles.display}>
        Let's set the content of your landing page
      </h2>
      <form name="saveContent" onSubmit={props.saveContent}>
        <div className={styles.FieldSet}>
          <FieldTypeText
            required
            autoFocus
            className={styles.TextField}
            label="Page Title"
            name="title"
            value={props.page.title}
            onChange={(name, value) => props.setPage(name, value)}
          />
          <FieldTypeText
            required
            className={styles.TextField}
            label="Page Content"
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
          <div className={styles.Actions}>
            <Button type="submit" name="submit" disabled={props.page.submitted}>
              {props.page.submitted ? (
                <React.Fragment>
                  <i className="fas fa-hourglass" aria-hidden="true" />
                  &nbsp;Saving Content
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <i className="fas fa-plus" aria-hidden="true" />
                  &nbsp;Save Content
                </React.Fragment>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
