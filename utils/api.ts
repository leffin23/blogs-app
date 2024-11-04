export async function getBlogs(categoryName?: string, userId?:string) {
    let url = ""

    if(userId){
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

export async function getTopCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/popular`);
    return res.json()
}


export async function likePost(blogId:string) {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/likes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: blogId})
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to like post:', errorData);
        } else {
            const likeData = await response.json();
            console.log('Post liked successfully:', likeData);
        }
      
}
export async function deleteBlogPost(blogId: string) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete blog post');
        }

        const data = await response.json();
        console.log('Success:', data.message); 
        return '200'

    } catch (error) {
        console.error('Error:', error.message); 
    }
}