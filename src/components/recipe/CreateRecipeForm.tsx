// create a new recipe form component
"use client";

import { useState } from "react";
import RecipeFormFields from "./RecipeFormFields";
import { RecipeSchema } from "@/lib/validation/recipe";
import { z } from "zod";

export default function CreateRecipeForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const onSuccessCallback = () => {
    console.log("Recipe created successfully!");
  };

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormError(null);

  const parse = RecipeSchema.safeParse(formValues);

  if (!parse.success) {
    setFormError(parse.error.errors.map(e => e.message).join("\n"));
    return;
  }

  // TODO Konstantin. Ersetze mit deinem echten API-Endpunkt
  setLoading(true);
  const res = await fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify(formValues),
    headers: { "Content-Type": "application/json" },
  });
  setLoading(false);
  if (res.ok && onSuccess) onSuccess();
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecipeFormFields onChange={handleChange} />
      {formError && <div className="text-error">{formError}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Create Recipe"}
      </button>
    </form>
  );
}