import BlogCard from "./BlogCard";
import { Blog } from "@/utils/interfaces";
import styles from "./Blogs.module.css"
import Link from "next/link";
import { getBlogs } from "@/utils/api";
import { auth } from "@/auth";

interface BlogsProps {
  categoryName?: string; 
  userId?:string;
}
const Blogs = async({categoryName, userId}:BlogsProps) => {
  const blogs: Blog[] = await getBlogs(categoryName, userId);
  const p = userId ? "You didn't create any blogs yet.." :"No blogs available"
  
  const session = await auth()
  const currentUser = session?.user?.id

  if(!blogs){
    return null
  }
  return (
    <div className={styles.allBlogs}>
          { userId ? (  <h1>My blogs</h1>) : (
            <h1>{categoryName ? `${categoryName} blogs` : "All blogs"}</h1>)}
      {blogs.length === 0? (
        <p className={styles.noBlogs}>{p}</p>
      )
    :
    ( <div className={styles.blogsList}> 
      
        {blogs.map((blog: Blog) => (
          <Link  key={blog.id} href={blog.userId === currentUser ? `/blogs/my-blogs/${blog.id}`:`/blogs/${blog.id}`} >
              <BlogCard 
                  blog={blog} /> 
          </Link>
        ))}
       
        </div>
    )
    }
    </div>
  )
}

export default Blogs
