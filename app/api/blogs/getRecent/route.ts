import { NextResponse } from "next/server";
import prisma from "@/utils/prismaInstance";


export async function GET(req:Request) {
    const limit = 10;
    try{
        const recentBlogs = await prisma.blog.findMany({
            include: {
                user: true,
                category: true,
                _count: {
                    select: {likes: true}
                }
            },
            orderBy: {
                createdAt:  'desc'
            },
            take: limit
        })
    
        const blogsWithLikes = recentBlogs.map((blog) => ({
            ...blog,
            likeCount: blog._count.likes,
        }));
    
        return NextResponse.json(blogsWithLikes)
    }catch(error){
        return NextResponse.json({error: "Couldn't fetch recent blogs"}) 
    }

    
}