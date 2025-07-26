"use client";

import LogInForm from "../authorization/components/LogInForm";
import { useAuthStore } from "@/store/useAuthUserStore";
import CreatePostForm from "./components/PostForm";
import PostsList from "./components/PostList";
import SignUpForm from "../authorization/components/SignUpForm";
import { useEffect } from "react";

export default function PostsPage() {
  const { user, hasAccount } = useAuthStore();
  useEffect(() => {
    console.log(user);
  });
  return (
    <main className="w-full min-h-screen flex justify-center pt-30 pb-1 font-sans">
      <div className="fixed inset-0 -z-1 ovals"></div>
      <div className="w-[1100px] flex gap-20">
        <div className="h-auto">
          {user ? (
            <CreatePostForm />
          ) : hasAccount ? (
            <LogInForm />
          ) : (
            <SignUpForm />
          )}
        </div>
        <PostsList />
      </div>
    </main>
  );
}
