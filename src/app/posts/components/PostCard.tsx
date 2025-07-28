import React, { useState } from "react";
import { CircleUserRound, Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types/Post";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useAuthStore } from "@/store/useAuthUserStore";
import { usePostsStore } from "@/store/usePostsStore";
import { DeleteBtn } from "@/components/ui/Buttons/DeleteBtn";
import { PostDialog } from "./PostDialog";

type PostCardProps = {
  post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthStore();
  const deletePost = usePostsStore((state) => state.deleteAndRefetchPost);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 137;
  const shouldShowReadMore =
    post.description && post.description.length > maxLength;

  const displayContent =
    shouldShowReadMore && !isExpanded
      ? post.description.substring(0, maxLength) + "..."
      : post.description;

  const isUserAuthor = user ? post.authorId === +user.id : false;
  const commentCount = post._count?.comments ?? 0;

  return (
    <div
      className={`w-full max-w-[518px] bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 ${
        isExpanded ? "min-h-fit" : "min-h-[140px]"
      }`}
    >
      <div className="p-4">
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

        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {post.title}
        </h3>

        {post.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              {displayContent}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 transition-colors"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
              {post.likes > 0 && (
                <span className="text-sm font-medium text-gray-700">
                  {post.likes}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              {commentCount > 0 && (
                <span className="text-sm font-medium text-gray-700">
                  {commentCount}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {user && isUserAuthor && (
              <DeleteBtn onClick={() => deletePost(post.id)} />
            )}
            <PostDialog post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};
