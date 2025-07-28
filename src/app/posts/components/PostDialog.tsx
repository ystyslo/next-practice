import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post } from "@/types/Post";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { CircleUserRound } from "lucide-react";
import { useCommentsStore } from "@/store/useCommentsStore";
import { CommentData } from "@/types/CommentData";
import { useAuthStore } from "@/store/useAuthUserStore";
import { DialogDescription } from "@radix-ui/react-dialog";

type PostDialogProps = {
  post: Post;
};

export function PostDialog({ post }: PostDialogProps) {
  const { user } = useAuthStore();
  const { fetchComments, createAndRefetchComment } = useCommentsStore();
  const comments = useCommentsStore((state) => state.commentsByPostId[post.id]);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchComments(post.id);
      console.log("comments are fetching");
    }
  }, [isOpen, fetchComments, post.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to comment");
      return;
    }
    const newComment: CommentData = {
      text: comment,
      postId: post.id,
      authorId: +user.id,
    };
    createAndRefetchComment(newComment);
    setComment("");
  };

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
        Comment
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0">
                <CircleUserRound size={40} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {post.author.username}
                  </span>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {getTimeAgo(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {post.description}
          </p>
        </section>

        <section className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Latest comments:
          </h3>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-2 bg-gray-100 rounded-md text-sm text-gray-800"
                >
                  <div className="flex justify-between font-semibold text-xs text-gray-600 mb-1">
                    <span>{comment.author.username}</span>
                    <span>{getTimeAgo(comment.createdAt)}</span>
                  </div>
                  <div>{comment.text}</div>
                </div>
              ))
            ) : (
              <div>No comments yet</div>
            )}
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="min-h-[100px]"
            autoComplete="off"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!comment.trim()}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
