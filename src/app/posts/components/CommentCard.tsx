"use client";

import { useCommentsStore } from "@/store/useCommentsStore";
import { Comment } from "@/types/Comment";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type CommentCardProps = {
  comment: Comment;
};

export default function CommentCard({ comment }: CommentCardProps) {
  const { deleteAndRefetchComment, isDeleting } = useCommentsStore();
  const { data: session } = useSession();
  const isUserAuthor = comment.authorId === session?.user?.id;
  const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(false);
  return (
    <div
      key={comment.id}
      className=" p-2 bg-gray-100 rounded-md text-sm text-gray-800 relative"
      onMouseEnter={() => setIsDeleteBtnVisible(true)}
      onMouseLeave={() => setIsDeleteBtnVisible(false)}
    >
      {isDeleteBtnVisible && isUserAuthor && (
        <button
          className="flex justify-center items-center h-6 w-6 bg-gray-400/40 hover:bg-gray-500/40 text-white
                    rounded-4xl absolute bottom-2 right-2 cursor-pointer"
          onClick={() => deleteAndRefetchComment(comment.id, comment.postId)}
          disabled={isDeleting}
        >
          <Trash size={16} />
        </button>
      )}
      <div className="flex justify-between font-semibold text-xs text-gray-600 mb-4">
        <span>{comment.author.username}</span>
        <span>{getTimeAgo(comment.createdAt)}</span>
      </div>
      <div className="text-gray-500 max-w-full break-words">{comment.text}</div>
    </div>
  );
}
