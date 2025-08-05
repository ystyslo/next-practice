"use client";

import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthUserStore";
import SkeletonPostForm from "./SkeletonPostForm";
import PostForm from "./PostForm";
import LogInForm from "@/app/authorization/components/LogInForm";
import SignUpForm from "@/app/authorization/components/SignUpForm";

export default function FormArea() {
  const { hasAccount } = useAuthStore();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="h-auto">
        <SkeletonPostForm />
      </div>
    );
  }

  return (
    <div className="h-auto">
      {session?.user ? (
        <PostForm />
      ) : hasAccount ? (
        <LogInForm />
      ) : (
        <SignUpForm />
      )}
    </div>
  );
}
