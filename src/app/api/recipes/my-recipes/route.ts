import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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
