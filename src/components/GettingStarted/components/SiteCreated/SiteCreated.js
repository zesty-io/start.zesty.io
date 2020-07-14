import React from 'react'

import styles from './siteCreated.less'
export function SiteCreated(props) {
  return (
    <div className={styles.SiteCreated}>
      {props.image ? (
        <img className={styles.img} src={props.image} width="960px" />
      ) : (
        <iframe
          width="960"
          height="560"
          src={props.video}
          frameborder="0"
          allow=" encrypted-media;"
          allowfullscreen></iframe>
      )}

      <h2 className={styles.display}>{props.title}</h2>
      <p className={styles.title}>{props.description}</p>
    </div>
  )
}
