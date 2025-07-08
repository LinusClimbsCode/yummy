import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { RecipePreview } from "@/types/recipe";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const savedRecipes = await db
      .select({
        id: schema.recipes.id,
        name: schema.recipes.name,
        image: schema.recipes.image,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
        difficulty: schema.recipes.difficulty,
      })
      .from(schema.savedRecipes)
      .innerJoin(
        schema.recipes,
        eq(schema.savedRecipes.recipeId, schema.recipes.id)
      )
      .where(eq(schema.savedRecipes.userId, session.user.id));

    const recipes: RecipePreview[] = await Promise.all(
      savedRecipes.map(async (r) => {
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
  } catch (err) {
    console.error("GET /api/recipes/saved-recipes failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const recipeId = Number(body.recipeId);

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    await db.insert(schema.savedRecipes).values({
      userId: session.user.id,
      recipeId,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/recipes/saved-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const recipeId = Number(body.recipeId);

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    await db
      .delete(schema.savedRecipes)
      .where(
        eq(schema.savedRecipes.userId, session.user.id) &&
          eq(schema.savedRecipes.recipeId, recipeId)
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/recipes/saved-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
