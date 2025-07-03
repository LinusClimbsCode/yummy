import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

import { eq } from "drizzle-orm";
import { recipes } from "./schema/schema";

// Fetch a single recipe by ID
export async function getRecipeById(id: string) {
  const result = await db.select().from(recipes).where(eq(recipes.id, Number(id)));
  return result[0]; // returns undefined if not found
}
