"use client";

import { PostCard } from "./PostCard";
import { Post } from "@/types/Post";
import { Inbox } from "lucide-react";
import { usePostsStore } from "@/store/usePostsStore";
import { useEffect } from "react";

export default function PostsList() {
  const posts = usePostsStore((state) => state.posts);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {posts.length === 0 ? (
        <div className="min-w-[518px] h-[50px] bg-white flex items-center justify-center gap-2 text-gray-700 font-medium rounded-md shadow">
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
