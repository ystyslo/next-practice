import FormArea from "./components/FormArea";
import PostsList from "./components/PostList";

export default function PostsPage() {
  return (
    <main className="w-full min-h-screen py-30 px-10 font-sans">
      <div className="fixed inset-0 -z-1 ovals"></div>
      <div className="w-full flex flex-col md:flex-row justify-center gap-20">
        <FormArea />
        <PostsList />
      </div>
    </main>
  );
}
