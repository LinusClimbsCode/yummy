export type RecipePreview = {
  id: number;
  name: string;
  image: string | null;
  totalTime: number;
  tags: string[];
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Unknown";
};

export type FullRecipe = RecipePreview & {
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  createdAt: string;
  userId: string;
  ingredients: Ingredient[];
  username: string;
};

export type RawRecipe = {
  id: number;
  name: string;
  image: string | null;
  prepTime: number;
  cookTime: number;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Unknown";
};

export type Unit =
  | "grams"
  | "kilograms"
  | "milliliters"
  | "ounces"
  | "pounds"
  | "cups"
  | "teaspoons"
  | "tablespoons"
  | "pieces";

export type Ingredient = {
  name: string;
  amount: number;
  unit: Unit;
};

export type RecipeFormData = {
  name?: string;
  instructions?: string[];
  ingredients?: {
    name: string;
    amount: number;
    unit: string;
  }[];
  mealType?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  cuisine?: string;
  calories?: number;
  userId: string;
  id?: number;
  tags?: string[];
  image?: string;
};

// ...existing code...

export type RecipeFormData = {
  name?: string;
  instructions?: string;
  ingredients?: {
    name: string;
    amount: number;
    unit: string;
  }[];
  mealType?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  cuisine?: string;
  calories?: number;
  userId: string;
  id?: number; 
  tags?: string[];
  image?: string; 
};