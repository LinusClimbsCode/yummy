import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    email,
    username,
    password,
  }: { email: string; username: string; password: string } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(
        or(eq(schema.users.email, email), eq(schema.users.username, username))
      );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
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

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
