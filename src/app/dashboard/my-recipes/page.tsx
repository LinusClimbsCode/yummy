// IMPORTS
import { Suspense } from "react";
import RecipeList from "@/components/recipeList";
import Searchbar from "@/components/searchbar";
import ListSkeleton from "@/components/skeleton/listSkeleton";
import addDelay from "@/components/delay";
import { fetchMyRecipes } from "@/lib/serverFetchHelpers";
import Link from "next/link";

//TYPES
import type { RecipePreview } from "@/types/recipe";

/**
 * Fetches and renders a list of recipes with loading state
 * @returns Promise<React.JSX.Element> The rendered recipe list
 */
async function MyRecipesList(): Promise<React.JSX.Element> {
  try {
    // Fetch all recipes for the list component with a random delay
    const recipes = await addDelay<RecipePreview[]>(() => fetchMyRecipes());

    if (recipes.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No recipes found. Create your first recipe!
          </p>
        </div>
      );
    }
    return (
      <ul className="list">
        {recipes.map((recipe: RecipePreview) => (
          <RecipeList
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            totalTime={recipe.totalTime}
            tags={recipe.tags}
            cuisine={recipe.cuisine}
            difficulty={recipe.difficulty}
            userId={recipe.userId}
            isSaved={recipe.isSaved}
          />
        ))}
      </ul>
    );
  } catch (error) {
    // Maybe add generic error handling later here
    console.error("Failed to fetch recipes:", error);
    return (
      <div className="alert alert-error">
        <span>Failed to load recipes. Please try again later.</span>
      </div>
    );
  }
}

export default function MyRecipesPage() {
  return (
    <>
      <h1 className="text-8xl font-bold bagel-fat-one-regular text-secondary mb-6">
        My Recipes
      </h1>
      <div className="flex">
        <Searchbar />
        <Link href={"/dashboard/create-recipe"} className="btn">
          Create New Recipe
        </Link>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <MyRecipesList />
      </Suspense>
    </>
  );
}
