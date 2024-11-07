'use client'
import { likePost, sendComment } from "@/utils/api";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface ButtonCheckAuthProps {
    children: React.ReactNode;
    logic: string;
    blogId: string;
    comment?: string;
    clearComment?: (value: string) => void; 
}

const ButtonCheckAuth: React.FC<ButtonCheckAuthProps>  = ({children, logic, blogId, comment, clearComment}) => {

        const {status } = useSession()
        const router = useRouter()

        const redirectAdd = async () => {

            if (status !== 'authenticated') {
                signIn("google")
                return; 
            } 
              

            if(logic === 'like'){
                await likePost(blogId);
                router.refresh();
            }else if(logic === 'comment' && comment && clearComment){
                console.log(comment)
                await sendComment(blogId, comment);
                clearComment('');
                router.refresh();
            }else{
                console.log("bleh")
            }
            
        };
    

  return (
    <div onClick={redirectAdd}>
      {children}
    </div>
  )
}

export default ButtonCheckAuth
