import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { getPrismaClient } from '@/utils/prismaInstance';
import prisma from "@/utils/prismaInstance"

// const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET(request:Request, {params}: {params : {name: string}}) {
    const {name} = await params;
    console.log(name.trim())
    const category = await prisma.category.findFirst({
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
        },
        include: {
            blogs: true
        }
    }) 


    return NextResponse.json(category)


    
} 