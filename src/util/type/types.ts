export interface Post {
  id: number;
  post_category: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface PostCategory {
  id: string|number;  
  name: string;
}

export type Comment = {
  comment_id: string;
  parent_comment: string | null;
  comment: string;
  comment_likes: number;
  related_post: number;
  created_at: string;
  updated_at: string;
  children: Comment[];
};
