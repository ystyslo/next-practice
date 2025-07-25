"use client";
import { useAuthStore } from "@/store/useAuthUserStore";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import { useEffect } from "react";

export default function AuthPage() {
  const { hasAccount, setHasAccount } = useAuthStore();
  useEffect(() => {
    setHasAccount(false);
  }, [setHasAccount]);
  return (
    <div className="h-screen flex justify-center items-center font-sans stripes">
      {hasAccount ? <LogInForm /> : <SignUpForm />}
    </div>
  );
}
