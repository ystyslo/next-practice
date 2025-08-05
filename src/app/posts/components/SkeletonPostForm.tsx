"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPostForm() {
  return (
    <div className="flex justify-center mx-auto">
      <div className="bg-white/90 w-full max-w-[518px] md:max-w-[342px] rounded-xl p-6 shadow-md space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-45" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-74" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-14 w-full" />
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
