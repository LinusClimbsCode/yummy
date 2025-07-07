import type { IngredientsServings } from "@/types/recipe";

export async function fetchIngredients(
  recipeId: number
): Promise<IngredientsServings> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/ingredients`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const data: IngredientsServings = await res.json();
  return data;
}
