export type MealType =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snack"
  | "Dessert"
  | "Brunch"
  | "Other";

export type RecipePreview = {
  id: number;
  name: string;
  image: string;
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
  tags: string[];
  image: string;
  mealType?: MealType;
};

export type RawRecipe = {
  id: number;
  name: string;
  image: string;
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

export type IngredientsServings = {
  servings: number;
  ingredients: Ingredient[];
};

export type RecipeFormData = {
  name?: string;
  instructions?: string[];
  ingredients?: {
    name: string;
    amount: number;
    unit: string;
  }[];
  mealType?: MealType;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  cuisine?: string;
  calories?: number;
  userId?: string;
  id?: number;
  tags?: string[];
  image?: string;
};
