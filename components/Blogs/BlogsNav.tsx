import Link from "next/link";
import styles from "./Blogs.module.css"
import { Category } from "@/utils/interfaces";
import { getCategories } from "@/utils/api";
import Hamburger from "./Hamburger";
import SearchCategory from "./SearchCategory";

const BlogsNav = async() => {
    const categories: Category[] = await getCategories();


  return (
    <div className={`${styles.nav} blogs_nav`} >
      <SearchCategory categories={categories}/>
      <Link href={"/blogs"}>All hacks</Link>
      
      {categories.map((category: Category) => (
      <Link key={category.id} href={`/blogs/categories/${category.name}`}>{category.name}</Link>
      ))}
     <Hamburger />
    </div>
  )
}

export default BlogsNav
