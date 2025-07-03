import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const recipes = await db.select().from(schema.recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

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
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
