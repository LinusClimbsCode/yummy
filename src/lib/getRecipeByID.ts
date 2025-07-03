import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { recipes } from "./schema/schema";

// Fetch a single recipe by ID server-side
export async function getRecipeById(id: string) {
  const result = await db.select().from(recipes).where(eq(recipes.id, Number(id)));
  return result[0]; // returns undefined if not found
}
