import { Comment } from "./Comment";

export type CommentData = Pick<Comment, "text" | "postId" | "authorId">;
