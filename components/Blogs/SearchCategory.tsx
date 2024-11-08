'use client'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import styles from "./Blogs.module.css"
import { Category } from "@/utils/interfaces"
import Link from "next/link"

interface SearchProps{
  categories: Category [];
}
const SearchCtageory = ({categories}: SearchProps) => {
  
    const [text, setText] = useState('')
    const [filtered, setFiltered] = useState<Category[]>([])
    // let filtered: Category[] = [];

    useEffect(() => {
        setFiltered(categories.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }, [text, categories]);


    
  return (
    <div className={`${styles.search} search`}>
      <div  className={styles.search_icon}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
      <input className={styles.search_input} placeholder="Search category.." value={text} onChange={(e)=> setText(e.target.value)} />
      <div className={styles.filtered}>
        {filtered.map((cat) => (
          <Link className={styles.cat} key={cat.id} href={`/blogs/categories/${cat.name}`}>{cat.name}</Link>
        ))}
        {filtered.length == 0 && (
          <div className={styles.no}>No category</div>
        )}
      </div>
    </div>
  )
}

export default SearchCtageory
