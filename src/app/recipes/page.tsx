// IMPORTS
import { Suspense } from 'react';
import List from '@/components/list';
import Searchbar from '@/components/searchbar';
import ListSkeleton from '@/components/skeleton/listSkeleton';
import { fetchRecipes } from '@/lib/fetchRecipes';
import addDelay from '@/components/delay';

// TYPES
import type { RecipePreview } from '@/types/recipe';

/**
 * Fetches and renders a list of recipes with loading state
 * @returns Promise<React.JSX.Element> The rendered recipe list
 */
async function RecipesList(): Promise<React.JSX.Element> {
  // Fetch all recipes for the list component with a random delay
  const recipes = await addDelay<RecipePreview[]>(() => fetchRecipes());

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {recipes.map((recipe: RecipePreview) => (
        <List
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

/**
 * Main recipes page component displaying searchable recipe list
 * @returns React.JSX.Element The recipes page layout
 */
export default function RecipesPage(): React.JSX.Element {
  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>
        <Searchbar />
      </header>

      <section>
        <Suspense fallback={<ListSkeleton />}>
          <RecipesList />
        </Suspense>
      </section>
    </main>
  );
}
