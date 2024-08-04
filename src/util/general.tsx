import { Comment, Post } from "./type/types";

export const sortComments = (comments: Comment[]): Comment[] => {
    // Sort comments by created_at in descending order
    comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Recursively sort the children comments
    comments.forEach((comment) => {
        if (comment.children && comment.children.length > 0) {
            sortComments(comment.children);
        }
    });

    return comments;
};

export const sortPosts = (posts: Post[], dateOrder: String = 'new'): Post[] => {
    // Sort posts by created_at in descending order
    if(dateOrder === 'new')
        posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return posts;
};

export const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short' }; // Abbreviated day name
    const dayName = date.toLocaleDateString('en-US', options); // Sun
    const day = String(date.getDate()).padStart(2, '0'); // 04
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 08 (months are zero-indexed in JavaScript)
    const year = date.getFullYear(); // 2024
    const hours = String(date.getHours()).padStart(2, '0'); // 07
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 57

    const formattedDate = `${dayName}, ${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
};