import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
  }

  try {
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json(deletedComment, { status: 200 });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }
}
