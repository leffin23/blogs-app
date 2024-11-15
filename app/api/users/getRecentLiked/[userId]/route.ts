// app/api/getRecentLikedPosts/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance"
import { auth } from '@/auth';


export async function GET(req: Request, {params}: {params: {userId: string}}) {
    const {userId} = await params

    if (!userId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
    }

    console.log(userId)
    const limit = 10;

    try {
        const recentLikedPosts = await prisma.like.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                blog: {
                    include: {
                        category: true,
                        user: true
                    },},
            },
        });

        console.log("Liked: ", recentLikedPosts)
        return NextResponse.json(recentLikedPosts.map(like => like.blog));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching recent liked posts" }, { status: 500 });
    }
}