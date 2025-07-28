import { CommentData } from "@/types/CommentData";

export async function getComments(postId: string) {
  const res = await fetch(`/api/comments?postId=${postId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch comments");
  }

  return res.json();
}

export async function createComment(data: CommentData) {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create comment");
  }

  return res.json();
}

export async function deleteComment(id: string) {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete comment");
  }

  return res.json();
}
