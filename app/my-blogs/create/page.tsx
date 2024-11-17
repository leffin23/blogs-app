import CreateBlog from '@/components/Blogs/CreateBlog'
import React from 'react'
import { EdgeStoreProvider } from '@/lib/edgestore'

const CreateBlogPage = () => {
  return (
    <EdgeStoreProvider>
    <div>
      <CreateBlog/>
    </div>
    </EdgeStoreProvider>
  )
}

export default CreateBlogPage


