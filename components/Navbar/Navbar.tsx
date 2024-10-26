import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { auth } from "@/auth";
import {  signIn, signOut } from "next-auth/react";
import AuthButtons from "./AuthButtons";
// import {
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image src="/logo.jpg" priority  width={35} height={35} alt="logo" />
          </Link>
        </div>
        <div>
          <Link href={"/blogs"}>Blogs</Link>
        </div>
        {/* <SignedOut>
            <SignInButton mode="modal">
             <div className={styles.login_btn}>Login</div> 
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        {session && session?.user ? (
          <>
            <div>
              <Link href={"/my-blogs"}>My blogs</Link>
            </div>
            <div>
            <div>
              <AuthButtons isSignedIn={true} />
            </div>
            </div>
            <div>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <AuthButtons isSignedIn={false} /> </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
