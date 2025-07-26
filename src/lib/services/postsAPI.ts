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

export async function createPost(data: {
  title: string;
  description: string;
  authorId: string | undefined;
}) {
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
