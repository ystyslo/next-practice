import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      username.length < 3 ||
      password.length < 6 ||
      !email.includes("@")
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { field: "username", message: "Username already taken" },
        { status: 409 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { field: "email", message: "Email already registered" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hash },
    });

    return NextResponse.json(
      { id: user.id, username: user.username, email: user.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
