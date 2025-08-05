import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Post } from "@/types/Post";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { CircleUserRound } from "lucide-react";
import { useCommentsStore } from "@/store/useCommentsStore";
import { CommentData } from "@/types/CommentData";
import { useSession } from "next-auth/react";
import PostDropdown from "./PostDropdown";
import CommentsList from "./CommentsList";
import { toast } from "sonner";

type PostDialogProps = {
  post: Post;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function PostDialog({ post, open, onOpenChange }: PostDialogProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const { fetchComments, createAndRefetchComment, isLoading } =
    useCommentsStore();
  const comments = useCommentsStore((state) => state.commentsByPostId[post.id]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (open) {
      fetchComments(post.id);
    }
  }, [open, fetchComments, post.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.warning("You must be logged in to comment");
      return;
    }
    const newComment: CommentData = {
      text: commentText,
      postId: post.id,
      authorId: user.id,
    };
    createAndRefetchComment(newComment);
    setCommentText("");
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
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
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <PostDropdown post={post} />
          </div>
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {post.description}
          </p>
        </section>

        <section className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Latest comments:
          </h3>
          {isLoading ? (
            <div className="w-full h-10 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : null}
          <CommentsList comments={comments} />
        </section>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Textarea
            name="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="min-h-[80px] break-words"
            autoComplete="off"
          />
          <div className="flex justify-end">
            <Button
              variant="blueBtn"
              type="submit"
              disabled={!commentText.trim()}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
