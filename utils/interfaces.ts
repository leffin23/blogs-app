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
    likeCount: string;
    likes: Like[];
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