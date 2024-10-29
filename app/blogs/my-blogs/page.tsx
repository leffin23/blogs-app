import { auth } from '@/auth';
import { signIn } from 'next-auth/react';
import Blogs from '@/components/Blogs/Blogs';
import { redirect } from 'next/navigation';

const MyBlogsPage = async () => {

    const session = await auth()
    
    if(!session || !session?.user){
        // await signIn("google")
        redirect("/blogs")
        return null;
    }
    
    const userId = session.user.id
    console.log("user id:", session.user.id)

    return (
        <div className='blog_page'>
            <Blogs userId={userId}/>
        </div>
    );
};
export default MyBlogsPage;