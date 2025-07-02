"use Client"
import { Suspense } from 'react';
import List from "@/components/list"
import Searchbar from "@/components/searchbar"
import ListSkeleton from '@/components/skeleton/listSkeleton';
import type { RecipePreview } from "@/types/recipe"

// add real data fetch
async function RecipesList() {
  // fake delay to test the loading state
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const response = await fetch("@/api/recipes/list");
  const recipes: RecipePreview[] = await response.json();

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {recipes.map((recipe) => (
        <List 
          key={recipe.id}
          image={recipe.image || ""} 
          title={recipe.name} 
          description={recipe.cuisine || ""} 
          id={recipe.id.toString()}
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
