import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getPrismaClient } from '@/utils/prismaInstance';

const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET(request:Request, {params}: {params : {name: string}}) {
    const {name} = await params;
    const category = await prisma.category.findUnique({
        where: {
            name: name,
        },
        include: {
            blogs: true
        }
    }) 
    return NextResponse.json(category)
    
} 