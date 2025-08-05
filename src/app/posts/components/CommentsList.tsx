import { Comment } from "@/types/Comment";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentListProps) {
  return (
    <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <div>No comments yet</div>
      )}
    </div>
  );
}
