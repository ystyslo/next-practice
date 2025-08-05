import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPostCard = () => {
  return (
    <Card className="w-full max-w-[518px] mx-auto rounded-xl border border-gray-200">
      <CardContent className="px-4 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex justify-between w-full">
            <Skeleton className="h-3 w-25" />
            <Skeleton className="h-3 w-13" />
          </div>
        </div>

        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-3/4" />

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-8 w-22 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SkeletonPostList = () => {
  return (
    <div className="w-full max-w-[518px] space-y-4">
      <SkeletonPostCard />
      <SkeletonPostCard />
      <SkeletonPostCard />
      <SkeletonPostCard />
    </div>
  );
};
