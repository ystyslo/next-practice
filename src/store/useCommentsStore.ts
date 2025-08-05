import { create } from "zustand";
import { Comment } from "@/types/Comment";
import {
  getComments,
  createComment,
  deleteComment,
} from "@/lib/services/commentsAPI";
import { CommentData } from "@/types/CommentData";
import { toast } from "sonner";

interface CommentState {
  commentsByPostId: Record<string, Comment[]>;
  fetchComments: (postId: string) => Promise<void>;
  isLoading?: boolean;
  createAndRefetchComment: (data: CommentData) => Promise<void>;
  isCreating?: boolean;
  deleteAndRefetchComment: (commentId: string, postId: string) => Promise<void>;
  isDeleting?: boolean;
}

export const useCommentsStore = create<CommentState>((set) => ({
  commentsByPostId: {},
  isLoading: true,
  isCreating: false,
  isDeleting: false,

  fetchComments: async (postId) => {
    try {
      const commentsFromServer = await getComments(postId);
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: commentsFromServer,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      set({ isLoading: false });
    }
  },

  createAndRefetchComment: async (data) => {
    try {
      await createComment(data);
      const updated = await getComments(data.postId);
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [data.postId]: updated,
        },
      }));
      toast.success("Comment added successfully!");
    } catch {
      toast.error("Something went wrong");
    }
  },

  deleteAndRefetchComment: async (commentId, postId) => {
    try {
      await deleteComment(commentId);
      const updated = await getComments(postId);
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: updated,
        },
      }));
      toast.success("Comment deleted successfully!");
    } catch {
      toast.error("Something went wrong");
    }
  },
}));
