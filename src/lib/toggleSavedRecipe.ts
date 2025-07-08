export async function toggleSavedRecipe(
  recipeId: number,
  save: boolean
): Promise<{ success: boolean }> {
  const res = await fetch("/api/recipes/saved-recipes", {
    method: save ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to update saved recipe");
  }

  return res.json();
}
