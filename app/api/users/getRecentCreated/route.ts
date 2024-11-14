import { NextResponse } from 'next/server';
import prisma from "@/utils/prismaInstance"
import { auth } from '@/auth';

export async function GET(req: Request, limit:number) {
   
    const session = await auth();
    // const limit = 10;

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
    }

    const userId = session.user.id;

    try {
        const recentCreatedPosts = await prisma.blog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json(recentCreatedPosts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error fetching recent created posts" }, { status: 500 });
    }
}