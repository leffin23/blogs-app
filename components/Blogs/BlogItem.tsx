import { BlogItemProps } from "@/utils/interfaces";
import Image from "next/image";
import styles from "./Blogs.module.css";
import ManageBlogBtns from "./ManageBlogBtns";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ButtonCheckAuth from "./ButtonCheckAuth";
import { auth } from "@/auth";

const BlogItem = async ({ blog, userId }: BlogItemProps) => {
  if (!blog) {
    redirect("/blogs");
  }
  const { id, title, content, category, user, image, likeCount, likes } = blog;

  const like = userId ? "You like it like that:" : user?.name 
  ? `${user.name} likes it like that:` 
  : "Someone likes it like that:";
  
  console.log("Likes", likes)
  
  const session = await auth();
  const hasLiked = session?.user?.id ? likes.some(like => like.userId === session?.user?.id) : false;


  return (
  <div className={styles.single_blog_section}>
    <div className={styles.single_blog}> 
      <div className={styles.likes}>
        {like}
        {/* {user?.name
          ? user.name + " likes it like that:"
          : "Someone likes it like that: "} */}
          <ButtonCheckAuth logic={'like'} blogId={id}>
            <button><FontAwesomeIcon icon={faHeart} className={`${hasLiked ? styles.liked : ""}`}/> {likeCount}</button>
          </ButtonCheckAuth>
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
    <div className={styles.blog_comments}>
        <div className={styles.comments}>

        </div>
        <div className={styles.add_comment}></div>
    </div>
      </div>
  );
};

export default BlogItem;
