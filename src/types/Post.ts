import { User } from "./User";

export interface Post {
  id: string;
  title: string;
  description: string;
  author: User;
  authorId: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  _count: {
    comments: number;
  };
}
