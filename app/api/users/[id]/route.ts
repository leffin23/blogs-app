import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { getPrismaClient } from '@/utils/prismaInstance';
import prisma from "@/utils/prismaInstance"
// const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET(request:Request, {params} : {params: {id: string}}) {
    const {id} = await params

    const userInfo = await prisma.user.findUnique({
        where: {
            clerkUserId: id
        },
        include:{
            blogs: {
                include: {
                    _count: {
                        select: {
                            likes: true,
                            comments: true,    
                        }

                    }
                }
            }
        }
    })

    if (!userInfo) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

    const transformedUserInfo = {
        ...userInfo,
        blogs: userInfo?.blogs.map((blog) => ({
          ...blog,
          likeCount: blog._count?.likes ?? 0,
          commentCount: blog._count?.comments ?? 0,
        })),
      };
      
    return NextResponse.json(transformedUserInfo)
    
}

