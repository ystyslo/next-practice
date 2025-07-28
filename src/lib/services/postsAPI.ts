import { PostData } from "@/types/PostData";

export async function getPosts() {
  const res = await fetch("/api/posts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Could not load posts");
  }

  return res.json();
}

export async function createPost(data: PostData) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Could not create a post");
  }

  return res.json();
}

export async function deletePost(id: string) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to delete post");
  }

  return res.json();
}

export async function updatePost(
  id: string,
  data: { title?: string; description?: string }
) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Could not update a post");
  }

  return res.json();
}
