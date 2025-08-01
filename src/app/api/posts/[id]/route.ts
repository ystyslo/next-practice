import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
