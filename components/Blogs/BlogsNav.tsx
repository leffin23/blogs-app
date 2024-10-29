import Link from "next/link";
import styles from "./Blogs.module.css"
import { Category } from "@/utils/interfaces";
import { getCategories } from "@/utils/api";
import Hamburger from "./Hamburger";

const BlogsNav = async() => {
    const categories: Category[] = await getCategories();

  return (
    <div className={`${styles.nav} blogs_nav`} >
    
      <Link href={"/blogs"}>All blogs</Link>
      { categories.map((category: Category) => (
      <Link key={category.id} href={`/blogs/categories/${category.name}`}>{category.name}</Link>
      ))}
     <Hamburger />
    </div>
  )
}

export default BlogsNav
