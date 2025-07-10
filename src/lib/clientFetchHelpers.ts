import type { RecipePreview, FullRecipe, RecipeFormData } from "@/types/recipe";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// Client-only helper for saved recipes
export async function fetchSavedRecipes(): Promise<RecipePreview[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/recipes/saved-recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch saved recipes");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    throw error;
  }
}

// Checks if a recipe is saved
export async function isRecipeSaved(recipeId: number): Promise<boolean> {
  try {
    const savedRecipes = await fetchSavedRecipes();
    return savedRecipes.some((recipe: RecipePreview) => recipe.id === recipeId);
  } catch (error) {
    console.error("Error checking if recipe is saved:", error);
    return false;
  }
}

// Toggle function - switch automatically
export async function toggleSavedRecipe(
  recipeId: number
): Promise<{ success: boolean; isSaved: boolean }> {
  try {
    const currentlySaved = await isRecipeSaved(recipeId);

    const res = await fetch(`${getBaseUrl()}/api/recipes/saved-recipes`, {
      method: currentlySaved ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ recipeId }),
    });

    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => ({ error: "Failed to toggle saved recipe" }));
      throw new Error(error?.error || "Failed to toggle saved recipe");
    }

    return {
      success: true,
      isSaved: !currentlySaved,
    };
  } catch (error) {
    console.error("Error toggling saved recipe:", error);
    throw error;
  }
}

export async function setSavedRecipe(
  recipeId: number,
  save: boolean
): Promise<{ success: boolean }> {
  const res = await fetch(`${getBaseUrl()}/api/recipes/saved-recipes`, {
    method: save ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ recipeId }),
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to update saved recipe" }));
    throw new Error(error?.error || "Failed to update saved recipe");
  }

  return res.json();
}

export async function updateMyRecipe(
  recipeId: number,
  recipeData: RecipeFormData
): Promise<FullRecipe> {
  const res = await fetch(`${getBaseUrl()}/api/recipes/my-recipes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ recipeId, ...recipeData }),
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to update recipe" }));
    throw new Error(error?.error || "Failed to update recipe");
  }

  return res.json();
}

export async function deleteMyRecipe(recipeId: number): Promise<void> {
  const res = await fetch(`${getBaseUrl()}/api/recipes/my-recipes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ recipeId }),
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to delete recipe" }));
    throw new Error(error?.error || "Failed to delete recipe");
  }
}
