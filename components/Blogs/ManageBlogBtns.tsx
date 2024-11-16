'use client'
import { deleteBlogPost } from '@/utils/api'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styles from "./Blogs.module.css"
import { redirect } from 'next/navigation'

interface ButtonsProps{
    blogId: string
}
const ManageBlogBtns = ({blogId}: ButtonsProps) => {

    const [loading, setLoading] = useState(false);
    const handleDelete = (e) => {
        e.preventDefault()
        if(confirm("Are you sure you want to delete a blog?")){
            deleteBlogPost(blogId)
            .then((res) => {
                if(res === '200'){
                    redirect('/blogs/my-blogs')
                }
            })
            setLoading(true)
        }
    }

    
  return (
    <div className={styles.btns}>
       <button onClick={(e) => handleDelete(e)} disabled={loading}> {loading ? "Deleting..." : "Delete"}  <FontAwesomeIcon icon={faTrashCan}  /></button>
       <button>Update <FontAwesomeIcon icon={faPenToSquare} /></button>
    </div>
  )
}

export default ManageBlogBtns
