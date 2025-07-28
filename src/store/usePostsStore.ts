import { createPost, deletePost, getPosts } from "@/lib/services/postsAPI";
import { Post } from "@/types/Post";
import { PostData } from "@/types/PostData";
import { create } from "zustand";

interface PostState {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  createAndRefetchPost: (postData: PostData) => Promise<void>;
  deleteAndRefetchPost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const postsFromServer = await getPosts();
      set({ posts: postsFromServer });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  },

  createAndRefetchPost: async (postData) => {
    try {
      await createPost(postData);
      const newPosts = await getPosts();
      set({ posts: newPosts });
    } catch (error) {
      console.error("Failed to create and fetch", error);
    }
  },

  deleteAndRefetchPost: async (postId) => {
    try {
      await deletePost(postId);
      const updatedPosts = await getPosts();
      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Failed to delete and fetch", error);
    }
  },
}));
