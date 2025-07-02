// Edit Recipe Page Basic Structure
import EditRecipeForm from "@/components/recipe/EditRecipeForm";
import { db } from "@/lib/db";
import { getRecipeById } from "@/lib/db";

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}