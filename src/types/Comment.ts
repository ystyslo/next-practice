import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  author: User;
  authorId: number;
  post: Post;
  postId: string;
}
