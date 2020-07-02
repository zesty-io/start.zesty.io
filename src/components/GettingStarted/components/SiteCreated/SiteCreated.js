import React from 'react'

import styles from './siteCreated.less'

export function SiteCreated(props) {
  return (
    <>
      <h2 className={styles.display}>Your landig page is created</h2>
      <div>
        <img className={styles.img} src={props.image} alt="image" />
      </div>
      <h2 className={styles.display}>{props.title}</h2>
      <p className={styles.title}>{props.description}</p>
    </>
  )
}
