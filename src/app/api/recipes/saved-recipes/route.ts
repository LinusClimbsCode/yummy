import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { RecipePreview } from "@/types/recipe";

// GET
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const savedRecipes = await db
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
          userId: r.userId,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          difficulty: r.difficulty,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
          isSaved: true,
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

// POST
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

    const existingRecipe = await db
      .select()
      .from(schema.savedRecipes)
      .where(
        and(
          eq(schema.savedRecipes.recipeId, recipeId),
          eq(schema.savedRecipes.userId, session.user.id)
        )
      )
      .limit(1);

    if (existingRecipe.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Recipe already saved",
        isSaved: true,
      });
    }

    await db.insert(schema.savedRecipes).values({
      recipeId,
      userId: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Recipe saved successfully",
        isSaved: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/recipes/saved-recipes failed:", err);

    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "23505"
    ) {
      return NextResponse.json({
        success: true,
        message: "Recipe already saved",
        isSaved: true,
      });
    }

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
    const body = await req.json();
    const recipeId = Number(body.recipeId);

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    await db
      .delete(schema.savedRecipes)
      .where(
        and(
          eq(schema.savedRecipes.recipeId, recipeId),
          eq(schema.savedRecipes.userId, session.user.id)
        )
      );

    return NextResponse.json({
      success: true,
      message: "Recipe removed from favorites",
      isSaved: false,
    });
  } catch (err) {
    console.error("DELETE /api/recipes/saved-recipes failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
