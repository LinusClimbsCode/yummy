// IMPORTS
import { Suspense } from 'react';
import Loading from '@/components/loading';
import RecipeCardHeader from '@/components/recipeCardHeader';
import RecipeCardIngredient from '@/components/recipeCardIngredients';
import RecipeCardDescription from '@/components/recipeCardDescription';
import { fetchRecipeById } from '@/lib/fetchRecipeById';
import Delay from '@/components/delay';
import { fetchIngredients } from '@/lib/fetchIngredients';

// TYPES
type PageParams = {
  params: Promise<{ id: string }>;
};

// Page Render Logic
export default async function Page({ params }: PageParams) {
  const { id } = await params;
  const recipeID: number = Number(id);

  // Fetch recipe data with random Delay
  const recipe = await Delay(() => fetchRecipeById(recipeID));
  // Fetch recipe ingredients with random Delay
  const ingredients = await Delay(() => fetchIngredients(recipeID));

  // Recipe Card is rendered together from 3 different components
  return (
    <>
      {/* Component 1 = Header, relay on fetchRecipeById*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardHeader
          title={recipe.name}
          image={recipe.image || undefined}
          cookTime={`${recipe.cookTime} Min.`}
          difficulty={recipe.difficulty}
          category={recipe.tags}
          author={recipe.username}
        />
      </Suspense>
      {/* Component 2 = Ingredients*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardIngredient 
          ingredients={ingredients} 
        />
      </Suspense>
      {/* Component 3 = Description, relay on fetchRecipeById*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardDescription
          instructions={recipe.instructions}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          username={recipe.username}
        />
      </Suspense>
    </>
  );
}
