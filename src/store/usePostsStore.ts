import { createPost, deletePost, getPosts } from "@/lib/services/postsAPI";
import { Post } from "@/types/Post";
import { PostData } from "@/types/PostData";
import { toast } from "sonner";
import { create } from "zustand";

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  fetchPosts: () => Promise<void>;
  createAndRefetchPost: (postData: PostData) => Promise<void>;
  deleteAndRefetchPost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostState>((set) => ({
  posts: [],
  isLoading: true,
  isCreating: false,
  isDeleting: false,
  fetchPosts: async () => {
    try {
      const postsFromServer = await getPosts();
      set({ posts: postsFromServer });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      set({ isLoading: false });
    }
  },

  createAndRefetchPost: async (postData) => {
    set({ isCreating: true });
    try {
      await createPost(postData);
      const newPosts = await getPosts();
      set({ posts: newPosts });
      toast.success("Post created successfully!");
    } catch {
      toast.error("Failed to create a post");
    } finally {
      set({ isCreating: false });
    }
  },

  deleteAndRefetchPost: async (postId) => {
    set({ isDeleting: true });

    try {
      await deletePost(postId);
      const updatedPosts = await getPosts();
      set({ posts: updatedPosts });
      toast.success("Post deleted successfully!");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      set({ isDeleting: false });
    }
  },
}));
