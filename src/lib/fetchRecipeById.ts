import type { FullRecipe } from "@/types/recipe";

export async function fetchRecipeById(id: number): Promise<FullRecipe> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipe with id " + id);
  }

  const data: FullRecipe = await res.json();
  return data;
}
