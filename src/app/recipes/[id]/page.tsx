// IMPORTS
import { Suspense } from 'react';
import Loading from '@/components/loading';
import RecipeCardHeader from '@/components/recipeCardHeader';
import RecipeCardIngredients from '@/components/recipeCardIngredients';
import RecipeCardDescription from '@/components/recipeCardDescription';
import { fetchRecipeById } from '@/lib/fetchRecipeById';
import Delay from '@/components/delay';
import { fetchIngredients } from '@/lib/fetchIngredients';

// TYPES
import { Ingredient, FullRecipe } from '@/types/recipe';

type PageParams = {
  params: Promise<{ id: string }>;
};

// fetch components
async function RecipeCardHeaderWithData({ recipeId }: { recipeId: number }) {
  // Fetch recipe data with random Delay
  const recipe = await Delay<FullRecipe>(() => fetchRecipeById(recipeId));

  return (
    <RecipeCardHeader
      title={recipe.name}
      image={recipe.image || undefined}
      cookTime={`${recipe.cookTime} Min.`}
      difficulty={recipe.difficulty}
      category={recipe.tags}
      author={recipe.username}
    />
  );
}

async function RecipeCardIngredientsWithData({ recipeId }: {recipeId: number;}) {
  // Fetch recipe ingredients with random Delay
  const ingredients = await Delay<Ingredient[]>(() => fetchIngredients(recipeId));

  return (
    <RecipeCardIngredients ingredients={ingredients} />
  )
}

async function RecipeCardDescriptionWithData({ recipeId }: {recipeId: number;}) {
  // Fetch recipe data with random Delay
  const recipe = await Delay<FullRecipe>(() => fetchRecipeById(recipeId));
  
    return (
        <RecipeCardDescription
          instructions={recipe.instructions}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          username={recipe.username}
        />
    );
}

// Page Render Logic
export default async function RecipeDetailPage({ params }: PageParams) {
  const { id } = await params;
  const recipeId: number = Number(id);

  // Recipe Card is rendered together from 3 different components
  return (
    <>
      {/* Component 1 = Header, rely on fetchRecipeById*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardHeaderWithData recipeId={recipeId} />
      </Suspense>
      {/* Component 2 = Ingredients*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardIngredientsWithData recipeId={recipeId} />
      </Suspense>
      {/* Component 3 = Description, rely on fetchRecipeById*/}
      <Suspense fallback={<Loading />}>
        <RecipeCardDescriptionWithData recipeId={recipeId} />
      </Suspense>
    </>
  );
}
