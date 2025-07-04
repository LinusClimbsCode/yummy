import { Suspense } from 'react';
import List from "@/components/list"
import Searchbar from "@/components/searchbar"
import ListSkeleton from '@/components/skeleton/listSkeleton';
import { fetchRecipes } from "@/lib/fetchRecipes";


async function RecipesList() {
  // fake delay to test the loading state
  await new Promise(resolve => setTimeout(resolve, 2000));

  const recipes = await fetchRecipes();
  
    return (
      <ul className="list bg-base-100 rounded-box shadow-md">
        {recipes.map((recipe) => (
          <List 
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            totalTime={recipe.totalTime}
            tags={recipe.tags}
            cuisine={recipe.cuisine}
          />
        ))}
      </ul>
    );
  } 

export default function Page() {
  return (
    <>
      <h1>Recipes</h1>
      <Searchbar />
      
      <Suspense fallback={<ListSkeleton />}>
        <RecipesList />
      </Suspense>
    </>
  );
}
