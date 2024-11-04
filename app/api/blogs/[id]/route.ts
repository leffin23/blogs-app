import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(request:Request, {params}: {params:{id: string}}) {

    const { id } = await params;

    const blogInfo = await prisma.blog.findUnique({
        where: {
            id: id
        },
        include:{
            user: true,
            category: true,
            likes: true,
            _count: {
                select: { likes: true },
            },
        },
    })

    if (!blogInfo) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const blogWithLikes = {
        ...blogInfo,
        likeCount: blogInfo._count.likes,
    };

    return NextResponse.json(blogWithLikes)
}


export async function DELETE(request:Request, {params}: {params:{id: string}}) {

    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const session = await auth(); 
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
 
        const blog = await prisma.blog.findUnique({
            where: { id },
            select: { userId: true }, 
        });

    
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        
        if (blog.userId !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized to delete this blog' }, { status: 403 });
        }

        await prisma.blog.delete({ where: { id } });
        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: 'Could not delete blog' }, { status: 500 });
    }
}
