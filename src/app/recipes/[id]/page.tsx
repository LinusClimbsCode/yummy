// IMPORTS
import { Suspense } from 'react';
import Loading from '@/components/loading';
import RecipeCardHeader from '@/components/recipeCardHeader';
import RecipeCardIngredients from '@/components/recipeCardIngredients';
import RecipeCardDescription from '@/components/recipeCardDescription';
import { fetchRecipeById } from '@/lib/fetchRecipeById';
import addDelay from '@/components/delay';
import { fetchIngredients } from '@/lib/fetchIngredients';

// TYPES
import { IngredientsServings, FullRecipe } from '@/types/recipe';

type PageParams = {
  params: Promise<{ id: string }>;
};

// FETCH COMPONENTS FUNCTIONS
/**
 * Renders the recipe card header with recipe data fetched asynchronously
 * Displays recipe name, image, cooking time, difficulty, tags, and author
 * @param recipeId - The unique identifier of the recipe to fetch
 * @returns Promise<React.JSX.Element> The rendered recipe header component
 */
async function RecipeCardHeaderWithData({ recipeId }: { recipeId: number }): Promise<React.JSX.Element> {
  // Fetch recipe data with random Delay
  const recipe = await addDelay<FullRecipe>(() => fetchRecipeById(recipeId));

  return (
    <RecipeCardHeader
      title={recipe.name}
      image={recipe.image}
      cookTime={recipe.cookTime}
      difficulty={recipe.difficulty}
      category={recipe.tags}
      author={recipe.username}
      mealType={recipe.mealType}
      recipeId={recipeId}
      recipeUserId={recipe.userId}
      isSaved={recipe.isSaved}
    />
  );
}

/**
 * Renders the recipe ingredients section with ingredients data fetched asynchronously
 * Displays a list of ingredients with their amounts and units
 * @param recipeId - The unique identifier of the recipe to fetch ingredients for
 * @returns Promise<React.JSX.Element> The rendered recipe ingredients component
 */
async function RecipeCardIngredientsWithData({ recipeId }: {recipeId: number;}): Promise<React.JSX.Element> {
  // Fetch recipe ingredients with random Delay
  const ingredientsData = await addDelay<IngredientsServings>(() => fetchIngredients(recipeId));

  return (
    <RecipeCardIngredients 
    servings={ingredientsData.servings}
    ingredients={ingredientsData.ingredients} 
    />
  );
}

/**
 * Renders the recipe description section with recipe data fetched asynchronously
 * Displays cooking instructions, prep time, cook time, and author information
 * @param recipeId - The unique identifier of the recipe to fetch
 * @returns Promise<React.JSX.Element> The rendered recipe description component
 */
async function RecipeCardDescriptionWithData({ recipeId }: {recipeId: number;}): Promise<React.JSX.Element> {
  // Fetch recipe data with random Delay
  const recipe = await addDelay<FullRecipe>(() => fetchRecipeById(recipeId));
  
    return (
        <RecipeCardDescription
          instructions={recipe.instructions}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          username={recipe.username}
        />
    );
}

// PAGE RENDER FUNCTION 
/**
 * Main recipe detail page component that renders a complete recipe view
 * Displays recipe header, ingredients, and description with individual loading states
 * Uses React Suspense for progressive loading of each section
 * @param params - Next.js route parameters containing the recipe ID
 * @returns Promise<React.JSX.Element> The complete recipe detail page layout
 */
export default async function RecipeDetailPage({ params }: PageParams): Promise<React.JSX.Element> {
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
