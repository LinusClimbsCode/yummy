import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

export default async function apiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeId = Number(req.query.id);

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    if (req.method === "GET") {
      const recipe = await db
        .select()
        .from(schema.recipes)
        .where(eq(schema.recipes.id, recipeId));

      if (!recipe.length) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      return res.status(200).json(recipe[0]);
    }

    if (req.method === "PUT") {
      const updated = await db
        .update(schema.recipes)
        .set(req.body)
        .where(eq(schema.recipes.id, recipeId))
        .returning();

      return res.status(200).json(updated[0]);
    }

    if (req.method === "DELETE") {
      await db.delete(schema.recipes).where(eq(schema.recipes.id, recipeId));

      return res.status(204).end();
    }

    return res.status(405).end();
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
