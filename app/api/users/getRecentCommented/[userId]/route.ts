import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance"

export async function GET(req: Request, {params}:{params: {userId: string}}) {


    const {userId} = await params

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }

    const limit = 10;
    try {
        const recentLikedPosts = await prisma.comment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            distinct: ['blogId'],
            include: {
                blog: {
                include: {
                    category: true,
                    user: true
                },},
        

    
            },
        
        });

        return NextResponse.json(recentLikedPosts.map(comment => comment.blog));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching recent liked posts" }, { status: 500 });
    }
}