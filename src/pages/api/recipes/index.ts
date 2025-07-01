import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";

export default async function apiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const recipes = await db.select().from(schema.recipes);
      return res.status(200).json(recipes);
    }

    if (req.method === "POST") {
      const body = req.body;

      const inserted = await db
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
          rating: body.rating,
          reviewCount: body.reviewCount,
          image: body.image,
          userId: null, // Muss angepasst werden sobald Auth steht
        })
        .returning();

      return res.status(201).json(inserted[0]);
    }

    return res.status(405).end();
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
