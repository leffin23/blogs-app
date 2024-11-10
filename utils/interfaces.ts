import { Like } from "@prisma/client";

export interface Blog {
    id: string;
    title: string;
    userId: string,
    content: string;
    user?: {
      name?: string;
      clerkUserId?: string
    };
    category?: {
      name?: string;
    };
    image?: string; 
    tags?: string;
    likeCount: string;
    likes: Like[];
    comments: Array<{
      id: string;
      content: string;
      userId: string;
      createdAt: Date;
      user: { name: string }; 
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