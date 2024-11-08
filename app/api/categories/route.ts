import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { getPrismaClient } from '@/utils/prismaInstance';

// const prisma = getPrismaClient();
import prisma from "@/utils/prismaInstance"
// const prisma = new PrismaClient();

export async function GET() {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories)
}


export async function POST(req: Request) {

    const requestBody = await req.json()

    const {name} = requestBody

    const newCategory = await prisma.category.create({
        data: {
            name: name
        }
    })
    return NextResponse.json(newCategory)
}

