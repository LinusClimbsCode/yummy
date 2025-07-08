import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { RecipeFormData, Unit, RecipePreview } from "@/types/recipe";

type Difficulty = RecipePreview["difficulty"];

// GET
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawRecipes = await db
    .select({
      id: schema.recipes.id,
      name: schema.recipes.name,
      image: schema.recipes.image,
      prepTime: schema.recipes.prepTime,
      cookTime: schema.recipes.cookTime,
      cuisine: schema.recipes.cuisine,
      difficulty: schema.recipes.difficulty,
    })
    .from(schema.recipes)
    .where(eq(schema.recipes.userId, session.user.id));

  const recipes = await Promise.all(
    rawRecipes.map(async (r) => {
      const tags = await db
        .select({ tag: schema.tags.tag })
        .from(schema.tags)
        .where(eq(schema.tags.recipeId, r.id));

      return {
        ...r,
        totalTime: r.prepTime + r.cookTime,
        tags: tags.map((t) => t.tag),
      };
    })
  );

  return NextResponse.json(recipes);
}

// PUT
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: RecipeFormData & { recipeId: number } = await req.json();
    const { recipeId, ...recipeData } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ userId: schema.recipes.userId })
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId));

    if (!existing[0] || existing[0].userId !== session.user.id) {
      return NextResponse.json(
        { error: "Recipe not found or access denied" },
        { status: 403 }
      );
    }

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
      mealType,
    } = recipeData;

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
        mealType: mealType ?? "Other",
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
  } catch (error) {
    console.error("PUT /api/recipes/my-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { recipeId } = await req.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ userId: schema.recipes.userId })
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId));

    if (!existing[0] || existing[0].userId !== session.user.id) {
      return NextResponse.json(
        { error: "Recipe not found or access denied" },
        { status: 403 }
      );
    }

    await db.delete(schema.recipes).where(eq(schema.recipes.id, recipeId));

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/recipes/my-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH / PUT
export async function PATCH(req: Request) {
  return PUT(req);
}
