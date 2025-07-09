import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().min(2, "Recipe name is required"),
  instructions: z.array(z.string().min(10, "Instructions are required")),
  prepTime: z.coerce.number().min(0, "Prep time must be at least 0"),
  cookTime: z.coerce.number().min(0, "Cook time must be at least 0"),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
  difficulty: z.enum(["Easy", "Medium", "Hard", "Unknown"]),
  cuisine: z.string().min(1, "Cuisine is required"),
  calories: z.coerce.number().min(0, "Calories must be at least 0"),
  image: z.string().url("Image must be a valid URL").or(z.literal("")).optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name required"),
      amount: z.coerce.number().min(0, "Amount must be at least 0"),
      unit: z.string().min(1, "Unit required"),
    })
  ).min(1, "At least one ingredient required"),
  tags: z.array(z.string()).default([]),
  mealType: z.enum(["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Brunch", "Other"]),
});