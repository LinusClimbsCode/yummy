import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { RecipePreview } from "@/types/recipe";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log("=== DEBUG API ROUTE ===");
    console.log("User ID:", userId);
    console.log("Session:", session?.user);

    const rawRecipes = await db
      .select({
        id: schema.recipes.id,
        userId: schema.recipes.userId,
        name: schema.recipes.name,
        image: schema.recipes.image,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
        difficulty: schema.recipes.difficulty,
      })
      .from(schema.recipes);

    console.log("Raw recipes count:", rawRecipes.length);

    let savedRecipeIds: number[] = [];
    if (userId) {
      const savedRecipes = await db
        .select({ recipeId: schema.savedRecipes.recipeId })
        .from(schema.savedRecipes)
        .where(eq(schema.savedRecipes.userId, userId));

      savedRecipeIds = savedRecipes.map((sr) => sr.recipeId);
      console.log("Saved recipe IDs:", savedRecipeIds);
    } else {
      console.log("No user logged in - no saved recipes");
    }

    const recipes: RecipePreview[] = await Promise.all(
      rawRecipes.map(async (r) => {
        const tags = await db
          .select({ tag: schema.tags.tag })
          .from(schema.tags)
          .where(eq(schema.tags.recipeId, r.id));

        const isSaved = savedRecipeIds.includes(r.id);

        console.log(`Recipe ${r.id} (${r.name}): isSaved = ${isSaved}`);

        return {
          id: r.id,
          userId: r.userId,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          difficulty: r.difficulty,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
          isSaved: isSaved,
        };
      })
    );

    console.log(
      "Final recipes with isSaved:",
      recipes.map((r) => ({ id: r.id, name: r.name, isSaved: r.isSaved }))
    );
    console.log("=== END DEBUG ===");

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipe list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
