import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { PostDeleteDialog } from "./PostDeleteDialog";
import { Post } from "@/types/Post";
import { useState } from "react";
import { useSession } from "next-auth/react";

type PostDropdownProps = {
  post: Post;
};

export default function PostDropdown({ post }: PostDropdownProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: session } = useSession();
  const isUserAuthor = post.authorId === session?.user?.id;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size="icon" className="p-1">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/70" side="bottom" align="end">
          <DropdownMenuItem disabled={!isUserAuthor}>
            <Pencil size={10} /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
            disabled={!isUserAuthor}
          >
            <Trash size={10} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PostDeleteDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        postId={post.id}
      />
    </>
  );
}
