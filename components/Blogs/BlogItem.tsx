import { BlogItemProps } from "@/utils/interfaces";
import Image from "next/image";
import styles from "./Blogs.module.css";
import ManageBlogBtns from "./ManageBlogBtns";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ButtonCheckAuth from "./ButtonCheckAuth";
import { auth } from "@/auth";
import Comment from "./Comment";
import { timeAgo } from "@/utils/date";

const BlogItem = async ({ blog, userId }: BlogItemProps) => {
  if (!blog) {
    redirect("/blogs");
  }
  const { id, title, content, category, user, image, likeCount, likes, comments, tags } = blog;


  const tagsArr = tags?.split(" ");
  const like = userId ? "You hack it like that:" : user?.name 
  ? `${user.name} hacks it:` 
  : "Someone hacks it:";
  
  console.log("Likes", likes)
  const session = await auth();
  const hasLiked = session?.user?.id ? likes.some(like => like.userId === session?.user?.id) : false;


  return (
  <div className={styles.single_blog_section}>

    <div className={styles.single_blog}> 
    {userId ? (
        <div>
          <ManageBlogBtns blogId={id} />
        </div>
      ) : (
        ""
      )}
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
      <div className={styles.tags}>
        {tagsArr?.map((tag:string, i:number) => <div className={styles.tag} key={i}>#{tag}</div>)}
      </div>
    
    </div>
    <div className={styles.blog_comments}>
        <div className={styles.comments}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}> 
              <div className={styles.comment_header}>    
                <div className={styles.comment_author}>{comment.user.name} </div>
                <div className={styles.comment_date}>{timeAgo( new Date(comment.createdAt))} </div>
              </div>
              <div className={styles.comment_content}>{comment.content} </div>
              </div>
            ))}
        </div>
          <Comment id={id}/>
    </div>
      </div>
  );
};

export default BlogItem;
