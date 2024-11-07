import Image from "next/image";
import styles from "./Blogs.module.css"
import { BlogItemProps } from "@/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const BlogCard: React.FC<BlogItemProps> = ({ blog }) => {
  const { title, content, user, image } = blog;

  return (
 <div className={styles.blog}>
      <div className={styles.header}><h2>{title}</h2></div>
      {user?.name ? <p className={styles.likes}>{user.name} hacks it like that:</p> : ""}
      <div className={styles.blog_info}>
      <p>{content}</p>
      {/* {category?.name && <p>Category: {category.name}</p>} */}
      {image && <div className={styles.blogImg}><Image width={100} height={100} src={image} alt={title} /> </div>}

      </div>
      <div className={styles.full}>See full <FontAwesomeIcon icon={faArrowRightLong} /> </div>
    </div>
  )
}

export default BlogCard
