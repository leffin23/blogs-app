
export async function getBlogs(categoryName?: string, userId?:string) {
    let url = ""

    if(userId){
        console.log("ID USEER KHDJHSJDHS", userId)
        url =`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`; 
        console.log(url)
    }else{
        url = categoryName ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryName}` : `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`;
    }

    const res = await fetch(url);
    
    if (!res.ok) {
        console.error('Failed to fetch blogs:', res.statusText);
        throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }

    try {
        let data = await res.json();
        data = userId ? data.blogs : data
        return categoryName ? data.blogs : data; 
    } catch (err) {
        console.error('Failed to parse JSON:', err);
        throw new Error('Response was not valid JSON');
    }
}

export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
    return res.json()
}
