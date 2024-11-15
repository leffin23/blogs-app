import { Like } from "@prisma/client";

export interface Blog {
    id: string;
    title: string;
    userId: string,
    content: string;
    user?: {
      name?: string;
      image?:string;
      clerkUserId?: string
    };
    category?: {
      name?: string;
    };
    image?: string; 
    tags?: string;
    likeCount: string;
    commentCount: string;
    createdAt: Date;
    likes: Like[];
    comments: Array<{
      id: string;
      content: string;
      userId: string;
      createdAt: Date;
      user: { name: string, image?: string }; 
  }>;
  }
  export interface BlogItemProps {
    blog: Blog,
    userId?: string
  }
  export interface Category {
    id: string;
    name: string;
    blogs: [];
  }