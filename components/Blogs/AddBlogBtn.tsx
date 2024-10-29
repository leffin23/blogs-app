'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import styles from "./Blogs.module.css";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react"

const AddBlogBtn = () => {
    const {status } = useSession()
    const router = useRouter();
    const redirectAdd = () => {
        if (status === 'authenticated') {
            router.push('/blogs/my-blogs/create');
        } else {
            signIn("google")

        }
    };

    return (
        <div className={styles.addBlog} onClick={redirectAdd}>
            <FontAwesomeIcon icon={faMarker} />
        </div>
    );
}

export default AddBlogBtn;