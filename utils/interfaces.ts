export interface Blog {
    id: string;
    title: string;
    content: string;
    user?: {
      name?: string;
    };
    category?: {
      name?: string;
    };
    image?: string; 
  }
  export interface BlogItemProps {
    blog: Blog
  }
  export interface Category {
    id: string;
    name: string;
    blogs: [];
  }