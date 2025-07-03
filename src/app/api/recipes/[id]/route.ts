import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  try {
    const [recipe] = await db
      .select()
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId));

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const [user] = await db
      .select({ username: schema.users.username })
      .from(schema.users)
      .where(eq(schema.users.id, recipe.userId!));

    const tags = await db
      .select({ tag: schema.tags.tag })
      .from(schema.tags)
      .where(eq(schema.tags.recipeId, recipe.id));

    const fullRecipe = {
      ...recipe,
      tags: tags.map((t) => t.tag),
      username: user?.username ?? "unknown",
    };

    return NextResponse.json(fullRecipe);
  } catch (err) {
    console.error("GET /api/recipes/[id] failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await db
    .select({ userId: schema.recipes.userId })
    .from(schema.recipes)
    .where(eq(schema.recipes.id, recipeId));

  if (existing[0]?.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const updated = await db
    .update(schema.recipes)
    .set(body)
    .where(eq(schema.recipes.id, recipeId))
    .returning();

  return NextResponse.json(updated[0]);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // same as your PUT handler
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await db
    .select({ userId: schema.recipes.userId })
    .from(schema.recipes)
    .where(eq(schema.recipes.id, recipeId));

  if (existing[0]?.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const updated = await db
    .update(schema.recipes)
    .set(body)
    .where(eq(schema.recipes.id, recipeId))
    .returning();

  return NextResponse.json(updated[0]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await db
    .select({ userId: schema.recipes.userId })
    .from(schema.recipes)
    .where(eq(schema.recipes.id, recipeId));

  if (existing[0]?.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.delete(schema.recipes).where(eq(schema.recipes.id, recipeId));
  return new Response(null, { status: 204 });
}
