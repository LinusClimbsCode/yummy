import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as schema from "@/lib/schema/schema";
import { NextResponse } from "next/server";
import type { Ingredient } from "@/types/recipe";

export async function GET() {
  try {
    const recipes = await db.select().from(schema.recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("GET /api/recipes error:", error);
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
        difficulty:
          body.difficulty as (typeof schema.difficultyEnum.enumValues)[number],
        cuisine: body.cuisine,
        calories: body.calories,
        image: body.image,
        userId: session.user.id,
        mealType:
          body.mealType as (typeof schema.mealTypeEnum.enumValues)[number],
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

    return NextResponse.json(insertedRecipe, { status: 201 });
  } catch (error) {
    console.error("POST /api/recipes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
