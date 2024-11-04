import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "iLike",
  description: "Blogs website with prisma, clerk and nextjs ",
  icons: {
    icon: "/logo.jpg", // 
  },
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
        <div className="main_container">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        </div>
      </body>
    </html>
    // </ClerkProvider>
  );
}
