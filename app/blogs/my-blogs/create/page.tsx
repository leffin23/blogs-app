import CreateBlog from '@/components/Blogs/CreateBlog'
import { EdgeStoreProvider } from '@/lib/edgestore'
import React from 'react'

const CreateBlogPage = () => {
  return (
    <EdgeStoreProvider>
    <div className='create_blog'>
      <CreateBlog/>
    </div>
    </EdgeStoreProvider>
  )
}

export default CreateBlogPage


