import { auth } from '@/auth';
import { signIn } from 'next-auth/react';
import Blogs from '@/components/Blogs/Blogs';

const MyBlogsPage = async () => {

    const session = await auth()
    
    if(!session || !session?.user){
        // await signIn("google")
        return null;
    }
    
    const userId = session.user.id
    console.log("user id:", session.user.id)

    return (
        <div>
            <Blogs userId={userId}/>
        </div>
    );
};
export default MyBlogsPage;