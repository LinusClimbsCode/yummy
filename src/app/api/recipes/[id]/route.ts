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
  const { id } = await params;
  const recipeId = Number(id);
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

    const ingredients = await db
      .select({
        name: schema.ingredients.name,
        amount: schema.ingredients.amount,
        unit: schema.ingredients.unit,
      })
      .from(schema.ingredients)
      .where(eq(schema.ingredients.recipeId, recipe.id));

    const instructions = Array.isArray(recipe.instructions)
      ? recipe.instructions
      : typeof recipe.instructions === "string"
        ? recipe.instructions.split(/[\n\r]+|\. +/).map(s => s.trim()).filter(Boolean)
        : [];

    const fullRecipe = {
      ...recipe,
      instructions, // always an array!
      tags: tags.map((t) => t.tag),
      username: user?.username ?? "unknown",
      ingredients,
      mealType: recipe.meal_type,
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
  const { id } = await params;
  const recipeId = Number(id);
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
  const { name, instructions, prepTime, cookTime, servings, difficulty, cuisine, calories, image, ingredients, tags, mealType } = body;

  // Validate required fields
  const updated = await db
    .update(schema.recipes)
    .set({
      name,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      calories,
      image,
      meal_type: mealType,
    })
    .where(eq(schema.recipes.id, recipeId))
    .returning();

  // Remove all old ingredients for this recipe
  await db.delete(schema.ingredients).where(eq(schema.ingredients.recipeId, recipeId));

  // Add the new ingredients
  if (Array.isArray(ingredients)) {
    await db.insert(schema.ingredients).values(
      ingredients.map((ingredient) => ({
        recipeId,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }))
    );
  }

  // Remove all old tags for this recipe
  await db.delete(schema.tags).where(eq(schema.tags.recipeId, recipeId));
  // Add the new tags
  if (Array.isArray(tags)) {
    await db.insert(schema.tags).values(
      tags.map((tag) => ({
        recipeId,
        tag,
      }))
    );
  }

  // Return the updated recipe
  return NextResponse.json(updated[0]);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const recipeId = Number(id);
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
  const { name, instructions, prepTime, cookTime, servings, difficulty, cuisine, calories, image, ingredients, tags, mealType } = body; 

  const updated = await db
    .update(schema.recipes)
    .set({
      name,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      calories,
      image,
      meal_type: mealType,
    })
    .where(eq(schema.recipes.id, recipeId))
    .returning();
  
  // Remove all old ingredients for this recipe
  await db.delete(schema.ingredients).where(eq(schema.ingredients.recipeId, recipeId));

  // Add the new ingredients
  if (Array.isArray(ingredients)) {
    await db.insert(schema.ingredients).values(
      ingredients.map((ingredient) => ({
        recipeId,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }))
    );
  }

  // Remove all old tags for this recipe
  await db.delete(schema.tags).where(eq(schema.tags.recipeId, recipeId));
  // Add the new tags
  if (Array.isArray(tags)) {
    await db.insert(schema.tags).values(
      tags.map((tag) => ({
        recipeId,
        tag,
      }))
    );
  }
  // Return the updated recipe
  return NextResponse.json(updated[0]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const recipeId = Number(id);
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
