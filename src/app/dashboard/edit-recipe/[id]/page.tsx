// Edit Recipe Page Basic Structure
import EditRecipeForm from "@/components/recipe/EditRecipeForm";
import { db } from "@/lib/db";
import { getRecipeById } from "@/lib/getRecipeByID";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const recipe = await getRecipeById(resolvedParams.id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="w-full mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}