import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

// const prisma = new PrismaClient();
import { getPrismaClient } from '@/utils/prismaInstance';

const prisma = getPrismaClient();

export async function POST(request:Request) {

    const requestBody = await request.json()
    const {id} = requestBody

    const session = await auth()

    if(!session || !session?.user || !session.user.id){ 
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingLike = await prisma.like.findFirst({
        where: {
            userId: session.user.id, 
            blogId: id
        }
    });
    if (existingLike) {
       
        await prisma.like.delete({
            where: {
                id: existingLike.id, 
            },
        });
        return NextResponse.json({ message: 'You have unliked this blog post.' }, { status: 200 });
    } else{

        const newLike = await prisma.like.create({
            data:{
                userId: session.user.id,
                blogId: id,
            }
        })
        return NextResponse.json({ message: 'You have liked this blog post.', like: newLike }, { status: 201 }); 
    }

}