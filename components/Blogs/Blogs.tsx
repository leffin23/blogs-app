import BlogCard from "./BlogCard";
import { Blog } from "@/utils/interfaces";
import styles from "./Blogs.module.css";
import Link from "next/link";
import { getBlogs } from "@/utils/api";
import { auth } from "@/auth";
import { getContentBasedRecommendations } from "@/utils/recommendations";

interface BlogsProps {
  categoryName?: string;
  userId?: string;
  personal?:boolean;
}

const Blogs = async ({ categoryName, userId, personal }: BlogsProps) => {
  let blogs: Blog[];

  if(personal){
    console.log('Personal')
    blogs = await getContentBasedRecommendations();
  }else{
    blogs = await getBlogs(categoryName, userId);
  }
  const caption = personal ? "Hacks feed" : "All blogs"
  const p = userId ? "You didn't create any hacks yet.." : "No hacks available";

  const session = await auth();
  const currentUser = session?.user?.id;

  if (!blogs) {
    return null;
  }
  return (
    <div className={styles.allBlogs}>
      {userId ? (
        <h1>My hacks</h1>
      ) : (
        <h1>{categoryName ? `${categoryName} hacks` : caption}</h1>
      )}
      {blogs.length === 0 ? (
        <p className={styles.noBlogs}>{p}</p>
      ) : (
        <div className={styles.blogsList}>
          {blogs.map((blog: Blog) => (
            <Link
              key={blog.id}
              href={
                blog.userId === currentUser
                  ? `/blogs/my-blogs/${blog.id}`
                  : `/blogs/${blog.id}`
              }
            >
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
