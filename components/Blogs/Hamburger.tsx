'use client'
import styles from "./Blogs.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


const Hamburger = () => {

    const [isOpen, setIsOpen ] = useState(true);

    useEffect(() => {
        const nav = document.querySelector(".blogs_nav");
        if (nav) nav.classList.toggle("active");
    },[isOpen])

    useEffect(() => {
        const handleClickOutside = (e) => {
          if(!e.target.closest('.hamburger')){
            setIsOpen(false);
          }
        }
    
        window.addEventListener('mousedown', handleClickOutside);
        return() => {
          window.removeEventListener('mousedown', handleClickOutside)
        }
    
      }, [])

  return (
    <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faBurger} /></div>
  )
}

export default Hamburger
