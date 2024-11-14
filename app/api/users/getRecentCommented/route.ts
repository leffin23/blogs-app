import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance"
import { auth } from '@/auth';

export async function GET(req: Request) {
   
    const session = await auth();

    const limit = 10;

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
    }
    const userId = session.user.id;
    try {
        const recentLikedPosts = await prisma.comment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                blog: true,
            },
        });

        return NextResponse.json(recentLikedPosts.map(comment => comment.blog));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching recent liked posts" }, { status: 500 });
    }
}