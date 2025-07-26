export interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: number;
  createdAt: Date;
  likes: number;
  comments: number;
}
