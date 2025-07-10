import type {
  IngredientsServings,
  RecipePreview,
  FullRecipe,
} from "@/types/recipe";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// SSR Fetch Option
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

// Direct server-side function
export async function fetchAllRecipes(): Promise<RecipePreview[]> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log("=== SERVER SIDE FETCH ===");
    console.log("User ID:", userId);
    console.log("Session:", session?.user);

    // 1. Get all recipes
    const rawRecipes = await db
      .select({
        id: schema.recipes.id,
        userId: schema.recipes.userId,
        name: schema.recipes.name,
        image: schema.recipes.image,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
        difficulty: schema.recipes.difficulty,
      })
      .from(schema.recipes);

    console.log("Raw recipes count:", rawRecipes.length);

    // 2. Get saved recipes for the current user (if logged in)
    let savedRecipeIds: number[] = [];
    if (userId) {
      const savedRecipes = await db
        .select({ recipeId: schema.savedRecipes.recipeId })
        .from(schema.savedRecipes)
        .where(eq(schema.savedRecipes.userId, userId));

      savedRecipeIds = savedRecipes.map((sr) => sr.recipeId);
      console.log("Saved recipe IDs:", savedRecipeIds);
    } else {
      console.log("No user logged in - no saved recipes");
    }

    // 3. Combine data
    const recipes: RecipePreview[] = await Promise.all(
      rawRecipes.map(async (r) => {
        const tags = await db
          .select({ tag: schema.tags.tag })
          .from(schema.tags)
          .where(eq(schema.tags.recipeId, r.id));

        const isSaved = savedRecipeIds.includes(r.id);

        return {
          id: r.id,
          userId: r.userId,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          difficulty: r.difficulty,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
          isSaved: isSaved,
        };
      })
    );

    console.log("=== END SERVER SIDE FETCH ===");
    return recipes;
  } catch (error) {
    console.error("Failed to fetch recipes with saved status:", error);
    throw error;
  }
}

// Fallback: API-based functions
export async function fetchRecipes(): Promise<RecipePreview[]> {
  const fetchOptions = await getSSRFetchOptions();

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
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    console.log("=== FETCH MY RECIPES ===");
    console.log("User ID:", userId);

    const rawRecipes = await db
      .select({
        id: schema.recipes.id,
        userId: schema.recipes.userId,
        name: schema.recipes.name,
        image: schema.recipes.image,
        prepTime: schema.recipes.prepTime,
        cookTime: schema.recipes.cookTime,
        cuisine: schema.recipes.cuisine,
        difficulty: schema.recipes.difficulty,
      })
      .from(schema.recipes)
      .where(eq(schema.recipes.userId, userId));

    console.log("My recipes count:", rawRecipes.length);

    const savedRecipes = await db
      .select({ recipeId: schema.savedRecipes.recipeId })
      .from(schema.savedRecipes)
      .where(eq(schema.savedRecipes.userId, userId));

    const savedRecipeIds = savedRecipes.map((sr) => sr.recipeId);
    console.log("Saved recipe IDs:", savedRecipeIds);

    const recipes: RecipePreview[] = await Promise.all(
      rawRecipes.map(async (r) => {
        const tags = await db
          .select({ tag: schema.tags.tag })
          .from(schema.tags)
          .where(eq(schema.tags.recipeId, r.id));

        const isSaved = savedRecipeIds.includes(r.id);
        console.log(`My Recipe ${r.id} (${r.name}): isSaved = ${isSaved}`);

        return {
          id: r.id,
          userId: r.userId,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          difficulty: r.difficulty,
          totalTime: (r.prepTime ?? 0) + (r.cookTime ?? 0),
          tags: tags.map((t) => t.tag),
          isSaved: isSaved,
        };
      })
    );

    console.log("=== END FETCH MY RECIPES ===");
    return recipes;
  } catch (error) {
    console.error("Failed to fetch my recipes:", error);
    throw error;
  }
}

export async function fetchRecipeById(id: number): Promise<FullRecipe> {
  const fetchOptions = await getSSRFetchOptions();

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
  const fetchOptions = await getSSRFetchOptions();

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

// Server-only function for saved recipes
export async function fetchSavedRecipesSSR(): Promise<RecipePreview[]> {
  const fetchOptions = await getSSRFetchOptions();

  const res = await fetch(
    `${getBaseUrl()}/api/recipes/saved-recipes`,
    fetchOptions
  );

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ error: "Failed to fetch saved recipes" }));
    throw new Error(error?.error || "Failed to fetch saved recipes");
  }

  return res.json();
}
