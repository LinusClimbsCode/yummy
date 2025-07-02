// Create Recipe Page Basic Structure
import CreateRecipeForm from "@/components/recipe/CreateRecipeForm";

export default function CreateRecipePage() {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      <CreateRecipeForm />
    </div>
  );
}