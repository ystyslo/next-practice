import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfileCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-14">
      <Skeleton className="w-24 h-24 rounded-full mb-6" />

      <Skeleton className="h-6 w-32 mb-1 rounded-md" />
      <Skeleton className="h-4 w-48 mb-8 rounded-md" />

      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
