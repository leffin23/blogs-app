import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const blogs = await prisma.blog.findMany({
        include: {
            user: true,
            category: true,
            _count: {
                select: { 
                    likes: true,
                    comments: true,
                },
            },
        },
        orderBy: [
            { likes: { _count: 'desc' } }, 
            { comments: { _count: 'desc' } }
        ],
        take: limit
    });

    const blogsWithCounts = blogs.map((blog) => ({
        ...blog,
        likeCount: blog._count.likes,
        commentCount: blog._count.comments,
    }));

    return NextResponse.json(blogsWithCounts);
}