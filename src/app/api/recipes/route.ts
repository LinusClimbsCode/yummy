import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Ingredient } from "@/types/recipe";

export async function GET() {
  try {
    const recipes = await db.select().from(schema.recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const [insertedRecipe] = await db
      .insert(schema.recipes)
      .values({
        name: body.name,
        instructions: body.instructions,
        prepTime: body.prepTime,
        cookTime: body.cookTime,
        servings: body.servings,
        difficulty: body.difficulty,
        cuisine: body.cuisine,
        calories: body.calories,
        image: body.image,
        userId: session.user.id,
      })
      .returning();

    const recipeId = insertedRecipe.id;

    if (Array.isArray(body.ingredients)) {
      await db.insert(schema.ingredients).values(
        (body.ingredients as Ingredient[]).map((ingredient) => ({
          recipeId,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        }))
      );
    }

    if (Array.isArray(body.tags)) {
      await db.insert(schema.tags).values(
        body.tags.map((tag: string) => ({
          recipeId,
          tag,
        }))
      );
    }

    if (Array.isArray(body.mealType)) {
      await db.insert(schema.mealTypes).values(
        body.mealType.map((mealType: string) => ({
          recipeId,
          mealType,
        }))
      );
    }

    return NextResponse.json(insertedRecipe, { status: 201 });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
