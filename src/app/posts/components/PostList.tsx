"use client";

import { getPosts } from "@/lib/services/postsAPI";
import { PostCard } from "./PostCard";
import { Post } from "@/types/Post";
import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsFromServer = await getPosts();
        setPosts(postsFromServer);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    }
    fetchPosts();
  }, []);

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
