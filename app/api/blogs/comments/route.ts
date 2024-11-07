import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { getPrismaClient } from '@/utils/prismaInstance';

const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function POST(req:Request) {

    const session = await auth()
    if(!session || !session.user || !session.user.id){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const request = await req.json()
    const {id, comment} = request

    try{
        const newComment = await prisma.comment.create({
            data: {
                userId: session.user.id,
                blogId: id,
                content: comment
            },
        })
        return NextResponse.json(newComment)

    } catch(err){
        return NextResponse.json({ error: 'Error adding a comment' }, { status: 401 })
    }



}