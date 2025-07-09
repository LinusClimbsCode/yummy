// IMPORTS
import { Suspense } from "react";
import RecipeList from "@/components/recipeList";
import Searchbar from "@/components/searchbar";
import ListSkeleton from "@/components/skeleton/listSkeleton";
import addDelay from '@/components/delay';
import { fetchMyRecipes } from "@/lib/fetchHelpers";
import Link from "next/link";

//TYPES
import type { RecipePreview } from '@/types/recipe';

/**
 * Fetches and renders a list of recipes with loading state
 * @returns Promise<React.JSX.Element> The rendered recipe list
 */
async function MyRecipesList(): Promise<React.JSX.Element> {
  // Fetch all recipes for the list component with a random delay
  const recipes = await addDelay<RecipePreview[]>(() => fetchMyRecipes());

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
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
        />
      ))}
    </ul>
  );
}

export default function MyRecipesPage() {
  return (
    <>
      <h1>My Recipes</h1>
      <div className="flex">
      <Searchbar />
      <Link href={"/dashboard/create-recipe"} className="btn">Create New Recipe</Link>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <MyRecipesList />
      </Suspense>
    </>
  );
}
