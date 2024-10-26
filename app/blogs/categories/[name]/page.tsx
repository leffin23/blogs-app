import Blogs from "@/components/Blogs/Blogs"

const CategorieBlogs = async ({params}:{params: {name: string}}) => {

    const {name} = await params

  return (
    <div className="blogs_page"> 
      <Blogs categoryName={name} />
    </div>
  )
}

export default CategorieBlogs
