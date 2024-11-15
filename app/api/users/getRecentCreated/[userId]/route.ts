import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance"

export async function GET(req: Request, {params}: {params: {userId: string}}) {
   
    const {userId} = await params

    const limit = 10;
    if (!userId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
    }
    console.log("UserId:", userId);
    try {
        const recentCreatedPosts = await prisma.blog.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                user: true,
            },
            take: limit,
        });
        console.log(recentCreatedPosts)
        return NextResponse.json(recentCreatedPosts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching recent created posts" }, { status: 500 });
    }
}