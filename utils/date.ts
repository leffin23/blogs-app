export const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
  
    if (diffInDays > 3) {
        return date.toLocaleDateString();
      } else if (diffInSeconds < 60) {
        return `${diffInSeconds}s${diffInSeconds !== 1 ? "s" : ""} ago`;
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}min${diffInMinutes !== 1 ? "s" : ""} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h${diffInHours !== 1 ? "s" : ""} ago`;
      } else if (diffInDays < 30) {
        return `${diffInDays}d${diffInDays !== 1 ? "s" : ""} ago`;
      } else {
        return `${diffInYears}y${diffInYears !== 1 ? "s" : ""} ago`;
      }
    
  };