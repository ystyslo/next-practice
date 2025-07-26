import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  const body = await req.json();
  const { title, description } = body;

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.json(
      { message: "Post not found or update failed" },
      { status: 500 }
    );
  }
}
