export type RecipePreview = {
  id: number;
  name: string;
  image: string | null;
  totalTime: number;
  tags: string[];
  cuisine: string;
  difficulty: string;
};

export type FullRecipe = RecipePreview & {
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  cuisine: string;
  calories: number;
  createdAt: string;
  userId: string;
  tags: string[];
  username: string;
};

export type RawRecipe = {
  id: number;
  name: string;
  image: string | null;
  prepTime: number;
  cookTime: number;
  cuisine: string;
  difficulty: string;
};
