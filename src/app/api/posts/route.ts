import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, authorId } = body;

  if (!title || !authorId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newPost = await prisma.post.create({
    data: { title, description, authorId },
  });
  return NextResponse.json(newPost, { status: 201 });
}
