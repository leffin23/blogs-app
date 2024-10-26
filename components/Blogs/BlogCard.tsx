import Image from "next/image";
import styles from "./Blogs.module.css"
import { BlogItemProps } from "@/utils/interfaces";

const BlogCard: React.FC<BlogItemProps> = ({ blog }) => {
  const { title = "No", content = "no", user, category, image } = blog;

  return (
 <div className={styles.blog}>
      <h2>{title}</h2>
      <p>{content}</p>
      {user?.name ? <p>Author: {user.name}</p> : <p>Author: Unknown Author</p>}
      {category?.name && <p>Category: {category.name}</p>}
      {image && <Image width={100} height={100} src={image} alt={title} />}
    </div>
  )
}

export default BlogCard
