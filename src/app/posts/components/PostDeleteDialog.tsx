"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePostsStore } from "@/store/usePostsStore";
import Loader from "@/components/ui/Loader";

type PostDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
};

export function PostDeleteDialog({
  open,
  onOpenChange,
  postId,
}: PostDeleteDialogProps) {
  const { deleteAndRefetchPost, isDeleting } = usePostsStore();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="blueBtn" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            variant="outline"
            onClick={() => deleteAndRefetchPost(postId)}
          >
            {isDeleting ? <Loader /> : "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
