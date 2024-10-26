import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request:Request, {params}: {params:{id: string}}) {

    const { id } = await params;

    const blogInfo = await prisma.blog.findUnique({
        where: {
            id: id
        },
        include:{
            user: true,
            category: true
        },
    })
    return NextResponse.json(blogInfo)
}
