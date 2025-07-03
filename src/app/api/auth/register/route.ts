import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";

export async function POST(req: Request) {
  const {
    email,
    username,
    password,
  }: { email: string; username: string; password: string } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(
        or(eq(schema.users.email, email), eq(schema.users.username, username))
      );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(schema.users)
      .values({
        email,
        username,
        passwordHash: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
