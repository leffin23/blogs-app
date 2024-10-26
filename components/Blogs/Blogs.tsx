import BlogCard from "./BlogCard";
import { Blog } from "@/utils/interfaces";
import styles from "./Blogs.module.css"
import Link from "next/link";
import { getBlogs } from "@/utils/api";

interface BlogsProps {
  categoryName?: string; 
  userId?:string;
}
const Blogs = async({categoryName, userId}:BlogsProps) => {
  const blogs: Blog[] = await getBlogs(categoryName, userId);
  // let blogs: Blog [] = []
  // if(userId){
  //   blogs = await getBlogs(userId);
  // }else{
  //   console.log("No user")
  //   blogs = categoryName ? await getBlogs(categoryName) : await getBlogs();
  // }

  console.log("My blogs", blogs)

  return (
    <div className={styles.allBlogs}>
            <h1>{categoryName ? `${categoryName} blogs` : "All blogs"}</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      )
    :
    ( <div className={styles.blogsList}> 
      
        {blogs.map((blog: Blog) => (
          <Link  key={blog.id} href={`/blogs/${blog.id}`} >
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
