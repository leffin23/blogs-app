import Image from "next/image";
import styles from "./Blogs.module.css";
import { BlogItemProps } from "@/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "@/utils/date";

const BlogCard: React.FC<BlogItemProps> = ({ blog }) => {
  const { title, content, user, image, likeCount, commentCount, createdAt } = blog;

  return (
    <div className={styles.blog}>
      <div className={styles.header}>
        <div className={styles.username}>
          {user?.image && (
         
              <Image
                src={user?.image}
                alt="user image"
                width={45}
                height={45}
              />
    
          )}
          <div className={styles.user_nick}>
            {user?.name ? (
              <p className={styles.likes}>{user.name} hacks it:</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.blog_date}>
          {timeAgo(new Date(createdAt))}
        </div>
      </div>
      <h2>{title}</h2>
      <div className={styles.blog_info}>
        <p>{content}</p>
        {/* {category?.name && <p>Category: {category.name}</p>} */}
        {image && (
          <div className={styles.blogImg}>
            <Image width={100} height={100} src={image} alt={title} />{" "}
          </div>
        )}
      </div>
      <div className={styles.footer}>
          <div className={styles.interactions}>
            <div><span>{likeCount} </span><FontAwesomeIcon icon={faHeart} /></div>
            <div><span>{commentCount}</span> <FontAwesomeIcon icon={faComment} /></div>
          </div>
          <div className={styles.full}>
            See full <FontAwesomeIcon icon={faArrowRightLong} />{" "}
        </div>
      </div>
     
    </div>
  );
};

export default BlogCard;
