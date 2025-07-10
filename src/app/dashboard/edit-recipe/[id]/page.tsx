// Edit Recipe Page Basic Structure
import EditRecipeForm from "@/components/recipe/EditRecipeForm";
import { fetchRecipeById } from "@/lib/fetchRecipeById";
import { RecipeFormData } from "@/types/recipe";
import type { FullRecipe } from "@/types/recipe";

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipeId = Number(id);
  const recipe = await fetchRecipeById(recipeId);
  console.log('Loaded recipe:', recipe);
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  
function toRecipeFormData(recipe: Partial<FullRecipe>): RecipeFormData {
  return {
    name: recipe.name ?? "",
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions
      : String(recipe.instructions || "")
          .split(/[,.]/)
          .filter((line: string) => line.trim().length > 0)
          .map((line: string) => line.trim()) || ["Please add instructions."],
    prepTime: recipe.prepTime ?? 0,
    cookTime: recipe.cookTime ?? 0,
    servings: recipe.servings ?? 1,
    difficulty: recipe.difficulty ?? "Unknown",
    cuisine: recipe.cuisine ?? "",
    calories: recipe.calories ?? 0,
    image: recipe.image ?? "",
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    mealType: typeof recipe.mealType === "string" ? recipe.mealType : "Other",
    id: recipe.id ?? undefined,
  };
}
  return (
    <div className="w-full mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <EditRecipeForm recipe={toRecipeFormData(recipe)} />
    </div>
  );
}