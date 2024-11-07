import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getPrismaClient } from '@/utils/prismaInstance';

const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}

