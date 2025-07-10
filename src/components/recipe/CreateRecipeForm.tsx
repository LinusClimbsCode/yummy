// create a new recipe form component
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RecipeFormFields from "./RecipeFormFields";
import { RecipeSchema } from "@/lib/validation/recipe";
import type { RecipeFormData } from "@/types/recipe";
import toast from "react-hot-toast";

export default function CreateRecipeForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formRef = useRef<{ getValues: () => RecipeFormData }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const values = formRef.current?.getValues();
    const parse = RecipeSchema.safeParse(values);
    if (!parse.success) {
      const errors: Record<string, string> = {};
      parse.error.errors.forEach((err) => {
        if (err.path.length) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    // Prepare data for submission
    setLoading(true);
    const res = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    // Always parse the response once
    const data = await res.json();
    // Handle server response
    if (!res.ok) {
      setFormError(data.message || "Failed to create recipe.");
      toast.error(data.message || "Failed to create recipe.");
      return;
    }
    // Call onSuccess callback if provided
    if (onSuccess) onSuccess();
    // redirect to the new recipe page
    if (data.id) {
      toast.success("Recipe created successfully!");
      router.push(`/recipes/${data.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecipeFormFields ref={formRef} defaultValues={{}} fieldErrors={fieldErrors} />
      {formError && <div className="text-error">{formError}</div>}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || Object.keys(fieldErrors).length > 0}
        >
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