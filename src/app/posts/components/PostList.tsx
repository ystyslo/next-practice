import { postsData } from "@/data/postData";
import { PostCard } from "./PostCard";

export function PostsList() {
  return (
    <div className="space-y-4">
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
