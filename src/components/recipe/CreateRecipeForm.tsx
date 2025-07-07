// create a new recipe form component
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeFormFields from "./RecipeFormFields";
import { RecipeSchema } from "@/lib/validation/recipe";
import type { RecipeFormData } from "@/types/recipe";

export default function CreateRecipeForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<RecipeFormData>({
    name: "",
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    servings: 2,
    difficulty: "Unknown",
    cuisine: "",
    calories: 0,
    image: "",
    ingredients: [],
    tags: [],
    mealType: [],
    userId: "",
    id: undefined, 
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parse = RecipeSchema.safeParse(formValues);

    if (!parse.success) {
      setFormError(parse.error.errors.map(e => e.message).join("\n"));
      console.log("Submitting:", formValues);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.ok && onSuccess) onSuccess();

    // redirect to the new recipe page
    const data = await res.json();
    if (res.ok && data.id) {
      router.push(`/dashboard/recipes/${data.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecipeFormFields defaultValues={formValues} onChange={handleChange} />
      {formError && <div className="text-error">{formError}</div>}
      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Create Recipe"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}