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
