import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { RecipeFormData, Unit, RecipePreview } from "@/types/recipe";

type Difficulty = RecipePreview["difficulty"];

// GET
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

    const ingredients = await db
      .select({
        name: schema.ingredients.name,
        amount: schema.ingredients.amount,
        unit: schema.ingredients.unit,
      })
      .from(schema.ingredients)
      .where(eq(schema.ingredients.recipeId, recipe.id));

    const [meal] = await db
      .select({ mealType: schema.mealTypes.mealType })
      .from(schema.mealTypes)
      .where(eq(schema.mealTypes.recipeId, recipeId));

    const instructions = Array.isArray(recipe.instructions)
      ? recipe.instructions
      : [];

    const fullRecipe = {
      ...recipe,
      instructions,
      tags: tags.map((t) => t.tag),
      username: user?.username ?? "unknown",
      ingredients,
      mealType: meal?.mealType ?? "Other",
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

// PUT
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

  const body: RecipeFormData = await req.json();

  const {
    name,
    instructions,
    prepTime,
    cookTime,
    servings,
    difficulty,
    cuisine,
    calories,
    image,
    ingredients,
    tags,
  } = body;

  const updated = await db
    .update(schema.recipes)
    .set({
      name: name ?? "",
      instructions: instructions ?? [],
      prepTime: prepTime ?? 0,
      cookTime: cookTime ?? 0,
      servings: servings ?? 1,
      difficulty: (difficulty ?? "Unknown") as Difficulty,
      cuisine: cuisine ?? "",
      calories: calories ?? 0,
      image: image ?? "",
    })
    .where(eq(schema.recipes.id, recipeId))
    .returning();

  await db
    .delete(schema.ingredients)
    .where(eq(schema.ingredients.recipeId, recipeId));
  if (Array.isArray(ingredients)) {
    await db.insert(schema.ingredients).values(
      ingredients.map((ingredient) => ({
        recipeId,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit as Unit,
      }))
    );
  }

  await db.delete(schema.tags).where(eq(schema.tags.recipeId, recipeId));
  if (Array.isArray(tags)) {
    await db.insert(schema.tags).values(
      tags.map((tag) => ({
        recipeId,
        tag,
      }))
    );
  }

  return NextResponse.json(updated[0]);
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return PUT(req, { params });
}

// DELETE
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
