import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().min(2, "Recipe name is required"),
  instructions: z.string().min(10, "Instructions are required"),
  prepTime: z.coerce.number().min(0, "Prep time must be at least 0"),
  cookTime: z.coerce.number().min(0, "Cook time must be at least 0"),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
  difficulty: z.string().min(1, "Difficulty is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
  calories: z.coerce.number().min(0, "Calories must be at least 0"),
  image: z.string().url("Image must be a valid URL").optional(),
  ingredients: z.array(z.string().min(1, "No empty ingredient")).min(1, "At least one ingredient required"),
  tags: z.array(z.string()).optional(),
  mealType: z.array(z.string()).optional(),
});