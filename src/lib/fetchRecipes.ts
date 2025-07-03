import { RecipePreview } from "@/types/recipe";

export async function fetchRecipes(): Promise<RecipePreview[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/list`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data: RecipePreview[] = await res.json();
  return data;
}
