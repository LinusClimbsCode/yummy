// IMPORTS
import { Suspense } from 'react';
import List from "@/components/list"
import Searchbar from "@/components/searchbar"
import ListSkeleton from '@/components/skeleton/listSkeleton';
import { fetchRecipes } from "@/lib/fetchRecipes";
import Delay from '@/components/delay';

// Recipie List Fetch call and component call
async function RecipesList() {

  const recipes = await Delay(() => fetchRecipes());
  
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

// Page function
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
