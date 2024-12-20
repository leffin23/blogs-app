import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { getPrismaClient } from '@/utils/prismaInstance';
import prisma from "@/utils/prismaInstance"
// const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET() {
    const popularCategories = await prisma.category.findMany({
            include:{
                _count:{
                    select:{
                        blogs: true
                    }
                }
            },
            orderBy: {
                blogs: {
                  _count: 'desc',
                },
            },
            take: 6
    })
    
    return NextResponse.json(popularCategories)
}