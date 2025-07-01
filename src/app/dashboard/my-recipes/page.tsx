import { Suspense } from 'react';
import List from '@/components/list';
import Searchbar from '@/components/searchbar';
import ListSkeleton from '@/components/skeleton/listSkeleton';

// add real data fetch
async function MyRecipesList() {
  // fake delay to test the loading state
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  //const recipes = await fetchMyRecipes(); 
  //delete from here
  const recipes = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
      title: 'Classic Margherita Pizza',
      description: 'Italian • 30 mins',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
      title: 'Chicken Carbonara',
      description: 'Pasta • 25 mins',
    },
  ];
  //to here

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {recipes.map((recipe) => (
        <List
          key={recipe.id}
          image={recipe.image}
          title={recipe.title}
          description={recipe.description}
          id={recipe.id}
        />
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <h1>My Recipes</h1>
      <Searchbar />
      
      <Suspense fallback={<ListSkeleton />}>
        <MyRecipesList />
      </Suspense>
    </>
  );
}
