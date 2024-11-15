import { auth } from "@/auth";
import Blogs from "@/components/Blogs/Blogs"
import { redirect } from "next/navigation";

const BlogsFeed = async() => {
  const session = await auth()
    
    if(!session || !session?.user){
        redirect("/blogs")
        return null;
    }

  return (
    <div className="blogs_page"> 
      <Blogs personal={true}/>
    </div>
  )
}

export default BlogsFeed
