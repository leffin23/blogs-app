import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
// import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Blogs App",
  description: "Blogs website with prisma, clerk and nextjs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
    // </ClerkProvider>
  );
}
