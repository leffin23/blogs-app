
// import { PrismaClient } from "@prisma/client"

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import {  NextResponse } from "next/server";
import { auth } from "@/auth";// Import to get session
import prisma from "@/utils/prismaInstance"
// import { getPrismaClient } from '@/utils/prismaInstance';

// const prisma = getPrismaClient();
// const prisma = new PrismaClient();

export async function GET() {
    const blogs = await prisma.blog.findMany({
        include: {
            user: true,
            category: true,
             _count: {
                select: { likes: true },
            },
        },
    })

    const blogsWithLikes = blogs.map((blog) => ({
        ...blog,
        likeCount: blog._count.likes,
    }));

    return NextResponse.json(blogsWithLikes)
}


export async function POST(request: Request) {
    const blogData = await request.formData();
    const title = blogData.get("title") as string;
    const category = blogData.get("category") as string;
    const content = blogData.get("content") as string;
    const image = blogData.get("image") as File || null;
    const session = await auth();

    console.log(session)
    console.log(session?.user)
    
    if (!session  || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let fileUrl: string | null = null; 

    if (image) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const relativeUploadDir = `/uploads/${new Date(Date.now())
            .toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-")}`;

        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error("Error while trying to create directory when uploading a file\n", e);
                return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
            }
        }

        try {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            fileUrl = `${relativeUploadDir}/${filename}`; 
        } catch (error) {
            console.error('Error uploading image:', error);
            return NextResponse.json({ error: 'Could not upload image' }, { status: 500 });
        }
    }

    try {
        // Create the blog post
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                user: { connect: { clerkUserId: session.user.id } },
                category: { connect: { id: category } },
                ...(fileUrl ? { image: fileUrl } : {}), 
            },
        });
        return NextResponse.json({ blog: newBlog }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Could not create blog' }, { status: 500 });
    }
}