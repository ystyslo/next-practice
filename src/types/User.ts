import { Post } from "./Post";

export interface User {
  id: string;
  username: string;
  email: string;
  posts: Post[];
  comments: Comment[];
}
