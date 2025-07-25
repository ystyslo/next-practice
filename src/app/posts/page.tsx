// import AuthForm from "../authorization/components/AuthForm";
import CreatePostForm from "./components/PostForm";
import { PostsList } from "./components/PostList";

export default function PostsPage() {
  return (
    <main className="w-full min-h-screen flex justify-center pt-30 pb-1 font-sans">
      <div className="fixed inset-0 -z-1 ovals"></div>
      <div className="w-[1100px] flex gap-20">
        <div className="h-auto">
          <CreatePostForm />
          {/* <AuthForm /> */}
        </div>
        <PostsList />
      </div>
    </main>
  );
}
