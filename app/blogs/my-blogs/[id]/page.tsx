import { auth } from "@/auth";
import BlogItem from "@/components/Blogs/BlogItem";

async function getBlog(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`)
  return res.json()

}

export const UserBlog = async ({ params }: { params: { id: string } })=> {
    const { id } = await params
    const session = await auth();
    const blog = await getBlog(id);
    
   
  return (
    <div className="blog_section">
      <BlogItem blog={blog} userId = {session?.user?.id}/>
    </div>
  )
}

export default UserBlog

