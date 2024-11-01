import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request:Request, {params} : {params: {id: string}}) {
    const {id} = await params

    const userInfo = await prisma.user.findUnique({
        where: {
            clerkUserId: id
        },
        include:{
            blogs: true
        }
    })

    
    return NextResponse.json(userInfo)
    
}

