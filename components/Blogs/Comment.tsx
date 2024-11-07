'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCheckAuth from "./ButtonCheckAuth";
import styles from "./Blogs.module.css";
import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Comment{
    id: string
}
const Comment = ({id}: Comment) => {
    const [comment, setComment] = useState('')

  return (
    <form className={styles.add_comment} onSubmit={(e) => e.preventDefault()}>
      <textarea name="comment" id="comment" value={comment} required onChange={(e)=> setComment(e.target.value)}></textarea>
      <ButtonCheckAuth logic={"comment"} blogId={id} comment={comment} clearComment={setComment}>
        <button type="submit" aria-label="Send">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </ButtonCheckAuth>
    </form>
  );
};

export default Comment;
