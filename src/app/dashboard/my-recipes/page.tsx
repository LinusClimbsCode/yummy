import List from '@/components/list';
import Searchbar from '@/components/searchbar';

// Example - using an array of recipe data
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

export default function Page() {
  return (
    <>
      <h1>My Recipes</h1>
      <Searchbar />
      <ul className="list bg-base-100 rounded-box shadow-md">
        {recipes.map((recipe, index) => (
          <List
            key={index}
            image={recipe.image}
            title={recipe.title}
            description={recipe.description}
            id={recipe.id}
          />
        ))}
      </ul>
    </>
  );
}
