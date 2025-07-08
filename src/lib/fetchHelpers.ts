import type {
  IngredientsServings,
  RecipePreview,
  FullRecipe,
  RecipeFormData,
} from "@/types/recipe";
import { cookies } from "next/headers";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// SSR Fetch-Option
const getSSRFetchOptions = async () => {
  const cookieStore = await cookies();
  return {
    cache: "no-store" as const,
    credentials: "include" as const,
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

// Client-Side Fetch-Option
const clientFetchOptions = {
  cache: "no-store" as const,
  credentials: "include" as const,
};

const isServer = typeof window === "undefined";

export async function fetchRecipes(): Promise<RecipePreview[]> {
  const fetchOptions = isServer
    ? await getSSRFetchOptions()
    : clientFetchOptions;

  const res = await fetch(`${getBaseUrl()}/api/recipes/list`, fetchOptions);

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch recipes" }));
    throw new Error(error?.error || "Failed to fetch recipes");
  }

  return res.json();
}

export async function fetchMyRecipes(): Promise<RecipePreview[]> {
  const fetchOptions = isServer
    ? await getSSRFetchOptions()
    : clientFetchOptions;

  const res = await fetch(
    `${getBaseUrl()}/api/recipes/my-recipes`,
    fetchOptions
  );

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch my recipes" }));
    throw new Error(error?.error || "Failed to fetch my recipes");
  }

  return res.json();
}

export async function fetchRecipeById(id: number): Promise<FullRecipe> {
  const fetchOptions = isServer
    ? await getSSRFetchOptions()
    : clientFetchOptions;

  const res = await fetch(`${getBaseUrl()}/api/recipes/${id}`, fetchOptions);

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch recipe" }));
    throw new Error(error?.error || `Failed to fetch recipe with id ${id}`);
  }

  return res.json();
}

export async function fetchIngredients(
  recipeId: number
): Promise<IngredientsServings> {
  const fetchOptions = isServer
    ? await getSSRFetchOptions()
    : clientFetchOptions;

  const res = await fetch(
    `${getBaseUrl()}/api/recipes/${recipeId}/ingredients`,
    fetchOptions
  );

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch ingredients" }));
    throw new Error(error?.error || "Failed to fetch ingredients");
  }

  return res.json();
}

// Client-only Helper
export async function toggleSavedRecipe(
  recipeId: number,
  save: boolean
): Promise<{ success: boolean }> {
  if (isServer) {
    throw new Error("toggleSavedRecipe can only be called on the client side");
  }

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
  if (isServer) {
    throw new Error("updateMyRecipe can only be called on the client side");
  }

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
  if (isServer) {
    throw new Error("deleteMyRecipe can only be called on the client side");
  }

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
