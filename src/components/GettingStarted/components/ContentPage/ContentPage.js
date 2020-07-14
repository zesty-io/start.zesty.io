import React from 'react'

import { Button } from '@zesty-io/core/Button'
import { FieldTypeText } from '@zesty-io/core/FieldTypeText'
import { FieldTypeTextarea } from '@zesty-io/core/FieldTypeTextarea'
// import { FieldTypeImage } from '@zesty-io/core/FieldTypeImage'

import styles from './ContentPage.less'
export function ContentPage(props) {
  return (
    <>
      <header className={styles.ContentPage}>
        <h2 className={styles.headline}>Now to add your content!</h2>
        <p className={styles.bodyText}>
          Don't worry if this is not the content you ultimately want. You will
          be able to change this at anytime within Zesty.io
        </p>
      </header>

      <form
        className={styles.saveContent}
        name="saveContent"
        onSubmit={props.saveContent}>
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
          <FieldTypeTextarea
            required
            className={styles.Textarea}
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
