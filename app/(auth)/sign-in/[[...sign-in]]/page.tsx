'use client'
import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

export default function Page() {
    const { isSignedIn } = useAuth();
    const router = useRouter();

    if (isSignedIn) {
        router.push("/")
    }
  return (
    <div    style={{display:"flex", justifyContent: "center", alignContent:"center", height:"100%"}} > 
    <SignIn />
    </div>
  )

}