import { Suspense } from 'react';
import RecipeList from "@/components/recipeList"
import Searchbar from "@/components/searchbar";
import ListSkeleton from '@/components/skeleton/listSkeleton';
import { fetchRecipes } from '@/lib/fetchRecipes';

async function CookbookRecipes() {
  // fake delay to test the loading state
  await new Promise(resolve => setTimeout(resolve, 2000));

  const recipes = await fetchRecipes();
  
    return (
      <ul className="list">
        {recipes.map((recipe) => (
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
          />
        ))}
      </ul>
    );
  } 

export default function Page() {
  return (
    <>
      <h1 className='text-8xl font-bold bagel-fat-one-regular text-secondary mb-6'>Cookbook</h1>
      <Searchbar />
      
      <Suspense fallback={<ListSkeleton />}>
        <CookbookRecipes />
      </Suspense>
    </>
  );
}