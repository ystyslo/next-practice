import { create } from "zustand";
import { Comment } from "@/types/Comment";
import {
  getComments,
  createComment,
  deleteComment,
} from "@/lib/services/commentsAPI";
import { CommentData } from "@/types/CommentData";

interface CommentState {
  commentsByPostId: Record<string, Comment[]>;
  fetchComments: (postId: string) => Promise<void>;
  createAndRefetchComment: (data: CommentData) => Promise<void>;
  deleteAndRefetchComment: (commentId: string, postId: string) => Promise<void>;
}

export const useCommentsStore = create<CommentState>((set) => ({
  commentsByPostId: {},

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
    } catch (error) {
      console.error("Failed to create and refetch comments", error);
    }
  },

  deleteAndRefetchComment: async (commentId, postId) => {
    try {
      await deleteComment(commentId);
      const updated = await getComments(postId);
      set({ commentsByPostId: updated });
    } catch (error) {
      console.error("Failed to delete and refetch comments", error);
    }
  },
}));
