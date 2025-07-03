import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { RawRecipe, RecipePreview } from "@/types/recipe";

export async function GET() {
  try {
    const rawRecipes: RawRecipe[] = await db
      .select({
        id: schema.recipes.id,
        name: schema.recipes.name,
        image: schema.recipes.image,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
        difficulty: schema.recipes.difficulty
      })
      .from(schema.recipes);

    const recipes: RecipePreview[] = await Promise.all(
      rawRecipes.map(async (r) => {
        const tags = await db
          .select({ tag: schema.tags.tag })
          .from(schema.tags)
          .where(eq(schema.tags.recipeId, r.id));

        return {
          id: r.id,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          difficulty: r.difficulty,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
        };
      })
    );

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipe list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
