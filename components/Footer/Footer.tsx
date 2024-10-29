import React from 'react'
import styles from "./Footer.module.css"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <Link className={styles.name} href={'/'}>iLike</Link>
      <div className={styles.socials}>
        <Link href="https//:gmail.com"><FontAwesomeIcon icon={faEnvelope} /></Link>
        <Link href="https//:instagram.com"> <FontAwesomeIcon icon={faInstagram} /></Link>
        <Link href="https//:facebook.com"> <FontAwesomeIcon icon={faFacebook} /> </Link>
        <Link href="https//:facebook.com"> <FontAwesomeIcon icon={faTwitter} /> </Link>
      </div>
    </footer>
  )
}

export default Footer
