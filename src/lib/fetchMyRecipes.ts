import type { RecipePreview } from "@/types/recipe";

export async function fetchMyRecipes(): Promise<RecipePreview[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/my-recipes`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch my recipes");
  }

  return res.json();
}
