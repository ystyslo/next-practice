"use client";

import { useSession } from "next-auth/react";
import ProfileCard from "./components/ProfileCard";
import { useAuthStore } from "@/store/useAuthUserStore";
import LogInForm from "../authorization/components/LogInForm";
import SignUpForm from "../authorization/components/SignUpForm";
import SkeletonProfileCard from "./components/SkeletonProfileCard";

export default function UserAccountPage() {
  const { data: session, status } = useSession();
  const { hasAccount } = useAuthStore();
  const user = session?.user;
  const isLoading = status === "loading";
  const pageStyles =
    "h-screen flex justify-center items-center p-8 font-sans bg-gradient-to-br from-blue-50 to-white";
  if (isLoading) {
    return (
      <div className={pageStyles}>
        <SkeletonProfileCard />
      </div>
    );
  }

  return (
    <div className={pageStyles}>
      {!isLoading && user ? (
        <ProfileCard />
      ) : hasAccount ? (
        <LogInForm />
      ) : (
        <SignUpForm />
      )}
    </div>
  );
}
