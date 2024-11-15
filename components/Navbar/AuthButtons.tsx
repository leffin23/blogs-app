"use client";

import { signIn, signOut } from "next-auth/react";

interface AuthButtonsProps {
  isSignedIn: boolean;
}

const AuthButtons = ({ isSignedIn }: AuthButtonsProps) => {
  return isSignedIn ? (
    <div onClick={() => signOut()}>Sign out</div>
  ) : (
    <div onClick={() => signIn("google", { callbackUrl: "/blogs/personal" })}>Login</div>
  );
};

export default AuthButtons;