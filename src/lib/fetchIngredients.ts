import type { Ingredient } from "@/types/recipe";

export async function fetchIngredients(
  recipeId: number
): Promise<Ingredient[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/ingredients`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const data: Ingredient[] = await res.json();
  return data;
}
