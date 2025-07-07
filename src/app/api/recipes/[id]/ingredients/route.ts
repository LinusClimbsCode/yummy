import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  try {
    const ingredients = await db
      .select({
        name: schema.ingredients.name,
        amount: schema.ingredients.amount,
        unit: schema.ingredients.unit,
      })
      .from(schema.ingredients)
      .where(eq(schema.ingredients.recipeId, recipeId));

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("GET /api/recipes/[id]/ingredients failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
