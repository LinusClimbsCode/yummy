export type RecipePreview = {
  id: number;
  name: string;
  image: string | null;
  totalTime: number | null;
  tags: string[];
  cuisine: string | null;
};

export type FullRecipe = RecipePreview & {
  instructions: string;
  prepTime: number | null;
  cookTime: number | null;
  servings: number;
  difficulty: string;
  cuisine: string;
  calories: number;
  createdAt: string;
  userId: string | null;
  tags: string[];
  username: string;
};

export type RawRecipe = {
  id: number;
  name: string;
  image: string | null;
  prepTime: number | null;
  cookTime: number | null;
  cuisine: string | null;
};
