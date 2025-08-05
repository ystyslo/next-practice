"use client";

import { usePostsStore } from "@/store/usePostsStore";
import { PostCard } from "./PostCard";
import { Post } from "@/types/Post";
import { Inbox } from "lucide-react";
import { useEffect } from "react";
import { SkeletonPostList } from "./SkeletonPostCard";

export default function PostsList() {
  const { posts, fetchPosts, isLoading } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return <SkeletonPostList />;
  }

  return (
    <>
      {posts.length === 0 ? (
        <div className="w-full max-w-[518px] h-[50px] bg-white flex items-center justify-center gap-2 text-gray-700 font-medium rounded-md shadow">
          <Inbox className="w-5 h-5" />
          No posts yet
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
