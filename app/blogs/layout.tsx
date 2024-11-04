import AddBlogBtn from "@/components/Blogs/AddBlogBtn";
import BlogsNav from "@/components/Blogs/BlogsNav";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <SessionProvider>
          <BlogsNav />
          <div className="blogPageContainer">
            {children}
  
        </div>
        <AddBlogBtn />

    </SessionProvider>
    );
  }
  