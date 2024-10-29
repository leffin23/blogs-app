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