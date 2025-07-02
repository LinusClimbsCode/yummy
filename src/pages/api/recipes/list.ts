import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import type { RawRecipe, RecipePreview } from "@/types/recipe";

export default async function apiRoute(
  req: NextApiRequest,
  res: NextApiResponse<RecipePreview[] | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawRecipes: RawRecipe[] = await db
      .select({
        id: schema.recipes.id,
        name: schema.recipes.name,
        image: schema.recipes.image,
        rating: schema.recipes.rating,
        reviewCount: schema.recipes.reviewCount,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
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
          rating: r.rating,
          reviewCount: r.reviewCount,
          cuisine: r.cuisine,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
        };
      })
    );

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipe list:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
