"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RecipeFormFields from "./RecipeFormFields";
import { RecipeSchema } from "@/lib/validation/recipe";
import type { RecipeFormData } from '@/types/recipe';
import toast from 'react-hot-toast';

export default function EditRecipeForm({ recipe }: { recipe: RecipeFormData }) {
  const router = useRouter();
  const [formData, setFormData] = useState<RecipeFormData>(recipe);
  const formRef = useRef<{ getValues: () => RecipeFormData }>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const onSuccess = () => {
    console.log("Recipe updated successfully!");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const values = formRef.current?.getValues();

    if (!values?.id) {
      setFormError("Recipe ID is missing!");
      return;
    }

    const parse = RecipeSchema.safeParse(values);
    if (!parse.success) {
      setFormError(parse.error.errors.map(e => e.message).join("\n"));
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/recipes/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    setSaving(false);

    if (res.ok) {
      toast.success("Recipe updated!");
      router.push(`/recipes/${values.id}`);
    } else {
      setFormError("Failed to update recipe.");
      toast.error("Failed to update recipe.");
    }
  };

  console.log("Edit page sending defaultValues:", formData);
  return (
    <form onSubmit={handleSubmit}>
      <RecipeFormFields
        ref={formRef}
        defaultValues={formData}
        onChange={(field, value) => setFormData(f => ({ ...f, [field]: value }))}
      />
      {formError && <div className="text-error">{formError}</div>}
      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}