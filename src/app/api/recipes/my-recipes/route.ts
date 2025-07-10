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
      userId: schema.recipes.userId,
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

    const recipe = await db
      .select({
        id: schema.recipes.id,
        userId: schema.recipes.userId,
        name: schema.recipes.name,
      })
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId))
      .limit(1);

    if (!recipe.length) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe[0].userId !== session.user.id) {
      return NextResponse.json(
        {
          error: "Forbidden - You can only delete your own recipes",
        },
        { status: 403 }
      );
    }

    await db.delete(schema.recipes).where(eq(schema.recipes.id, recipeId));

    return NextResponse.json({
      success: true,
      message: `Recipe "${recipe[0].name}" deleted successfully`,
    });
  } catch (error) {
    console.error("DELETE /api/recipes/my-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { recipeId, ...updateData } = body;

    if (isNaN(Number(recipeId))) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    const recipe = await db
      .select({
        id: schema.recipes.id,
        userId: schema.recipes.userId,
      })
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId))
      .limit(1);

    if (!recipe.length) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe[0].userId !== session.user.id) {
      return NextResponse.json(
        {
          error: "Forbidden - You can only update your own recipes",
        },
        { status: 403 }
      );
    }

    await db
      .update(schema.recipes)
      .set(updateData)
      .where(eq(schema.recipes.id, recipeId));

    const updatedRecipe = await db
      .select()
      .from(schema.recipes)
      .where(eq(schema.recipes.id, recipeId))
      .limit(1);

    return NextResponse.json(updatedRecipe[0]);
  } catch (error) {
    console.error("PUT /api/recipes/my-recipes failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
