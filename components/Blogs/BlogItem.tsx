import { BlogItemProps } from "@/utils/interfaces";
import Image from "next/image";
import styles from "./Blogs.module.css";
import ManageBlogBtns from "./ManageBlogBtns";
import { redirect } from "next/navigation";

const BlogItem = ({ blog, userId }: BlogItemProps) => {
  if (!blog) {
    redirect("/blogs");
  }
  const { id, title, content, category, user, image } = blog;

  const likes = userId ? "You like it like that:" : user?.name 
  ? `${user.name} likes it like that:` 
  : "Someone likes it like that:";
  
  return (
    <div className={styles.single_blog}>
      
      <div className={styles.likes}>
        {likes}
        {/* {user?.name
          ? user.name + " likes it like that:"
          : "Someone likes it like that: "} */}
      </div>
      <h1>{title}</h1>
      <p>{content}</p>
      {category?.name && <p>Category: {category.name}</p>}
      {image ? <Image unoptimized={true} src={image} alt={title} width={100} height={100} /> : ""}
      {userId ? (
        <div>
          <ManageBlogBtns blogId={id} />
        </div>
      ) : (
        ""
      )}
      </div>
   
  );
};

export default BlogItem;
