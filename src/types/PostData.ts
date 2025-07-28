import { Post } from "./Post";

export type PostData = Pick<
  Post,
  "title" | "description" | "authorId" | "author"
>;
