"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeFormFields from "./RecipeFormFields";
import { RecipeSchema } from "@/lib/validation/recipe";
import type { RecipeFormData } from '@/types/recipe';

export default function EditRecipeForm({ recipe }: { recipe: RecipeFormData }) {
  const router = useRouter();
  const [formData, setFormData] = useState<RecipeFormData>(recipe);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const onSuccess = () => {
    console.log("Recipe updated successfully!");
  };

  // Handle field changes
  const handleChange = (field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parse = RecipeSchema.safeParse(formData);

    if (!parse.success) {
      setFormError(parse.error.errors.map(e => e.message).join("\n"));
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/recipes/${formData.id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    setSaving(false);
    if (res.ok && onSuccess) onSuccess();
    if (!res.ok) {
      console.error("Failed to update recipe:", res.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RecipeFormFields defaultValues={formData} onChange={handleChange} />
      {formError && <div className="text-error">{formError}</div>}
      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/dashboard")}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}