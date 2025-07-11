// Create Recipe Page Basic Structure
import CreateRecipeForm from "@/components/recipe/CreateRecipeForm";

export default function CreateRecipePage() {
  return (
    <div className="w-full mx-auto p-8">
      <h1 className="text-8xl font-bold bagel-fat-one-regular text-secondary mb-6">Create Recipe</h1>
      <CreateRecipeForm />
    </div>
  );
}