import BlogItem from "@/components/Blogs/BlogItem";

async function getBlog(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`)
  return res.json()

}
export const Blog = async ({ params }: { params: { id: string } })=> {
    const { id } = await params
    const blog = await getBlog(id);
    
   
  return (
    <div className="blog_section">
      <BlogItem blog={blog} />
    </div>
  )
}

export default Blog

