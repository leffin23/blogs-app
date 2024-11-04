'use client'
import { likePost } from "@/utils/api";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface ButtonCheckAuthProps {
    children: React.ReactNode;
    logic: string;
    blogId: string // Accept children as a prop
}

const ButtonCheckAuth: React.FC<ButtonCheckAuthProps>  = ({children, logic, blogId}) => {

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
            }else if(logic === 'comment'){
                console.log("comment")
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
