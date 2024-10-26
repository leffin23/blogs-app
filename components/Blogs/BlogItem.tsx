import { BlogItemProps } from "@/utils/interfaces"
import Image from "next/image"
import styles from "./Blogs.module.css"


const BlogItem = ({blog}: BlogItemProps) => {
  const  {title, content, category, user, image} = blog
  return (
    <div className={styles.single_blog}>
     <div>{user?.name ? user.name + " likes it like that:" : "Someone likes it like that: "}</div>
      <h1>{title}</h1>
      <p>{content}</p>
      {category?.name && <p>Category: {category.name}</p>}
      {image? <Image src={image} alt={title} width={100} height={100}/>: ""}
    </div>
  )
}

export default BlogItem
