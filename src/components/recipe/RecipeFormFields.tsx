'use client';

import { useState } from 'react';

interface RecipeFormFieldsProps {
  defaultValues?: {
    name?: string;
    instructions?: string;
    prepTime?: number;
    cookTime?: number;
    servings?: number;
    difficulty?: string;
    cuisine?: string;
    calories?: number;
    ingredients?: string[];
    tags?: string[];
    mealType?: string[];
    image?: string;
  };
  onChange?: (field: string, value: any) => void;
}

export default function RecipeFormFields({ defaultValues = {}, onChange }: RecipeFormFieldsProps) {
  const [ingredients, setIngredients] = useState<string[]>(defaultValues.ingredients || []);
  const [tags, setTags] = useState<string[]>(defaultValues.tags || []);
  const [mealType, setMealType] = useState<string[]>(defaultValues.mealType || []);

  const handleChange = (field: string, value: any) => {
    onChange?.(field, value);
  };

  return (
    /* Recipe Form Fields */
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Recipe name"
        defaultValue={defaultValues.name}
        onChange={(e) => handleChange('name', e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Instructions"
        defaultValue={defaultValues.instructions}
        onChange={(e) => handleChange('instructions', e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <input
        type="number"
        placeholder="Prep time (min)"
        defaultValue={defaultValues.prepTime}
        onChange={(e) => handleChange('prepTime', parseInt(e.target.value))}
        className="input input-bordered w-full"
      />
      <input
        type="number"
        placeholder="Cook time (min)"
        defaultValue={defaultValues.cookTime}
        onChange={(e) => handleChange('cookTime', parseInt(e.target.value))}
        className="input input-bordered w-full"
      />
      <input
        type="number"
        placeholder="Servings"
        defaultValue={defaultValues.servings}
        onChange={(e) => handleChange('servings', parseInt(e.target.value))}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Difficulty"
        defaultValue={defaultValues.difficulty}
        onChange={(e) => handleChange('difficulty', e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Cuisine"
        defaultValue={defaultValues.cuisine}
        onChange={(e) => handleChange('cuisine', e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="number"
        placeholder="Calories"
        defaultValue={defaultValues.calories}
        onChange={(e) => handleChange('calories', parseInt(e.target.value))}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Image URL"
        defaultValue={defaultValues.image}
        onChange={(e) => handleChange('image', e.target.value)}
        className="input input-bordered w-full"
      />

      {/* Ingredients field group */}
      <div>
        <label className="font-semibold">Ingredients</label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index] = e.target.value;
                  setIngredients(updated);
                  handleChange('ingredients', updated);
                }}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = ingredients.filter((_, i) => i !== index);
                  setIngredients(updated);
                  handleChange('ingredients', updated);
                }}
                className="btn btn-error"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updated = [...ingredients, ''];
              setIngredients(updated);
              handleChange('ingredients', updated);
            }}
            className="btn btn-outline"
          >
            + Add Ingredient
          </button>
        </div>
      </div>

      {/* Tags field group */}
      <div>
        <label className="font-semibold">Tags</label>
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => {
                  const updated = [...tags];
                  updated[index] = e.target.value;
                  setTags(updated);
                  handleChange('tags', updated);
                }}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = tags.filter((_, i) => i !== index);
                  setTags(updated);
                  handleChange('tags', updated);
                }}
                className="btn btn-error"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updated = [...tags, ''];
              setTags(updated);
              handleChange('tags', updated);
            }}
            className="btn btn-outline"
          >
            + Add Tag
          </button>
        </div>
      </div>

      {/* MealType field group */}
      <div>
        <label className="font-semibold">Meal Type</label>
        <div className="space-y-2">
          {mealType.map((type, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={type}
                onChange={(e) => {
                  const updated = [...mealType];
                  updated[index] = e.target.value;
                  setMealType(updated);
                  handleChange('mealType', updated);
                }}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = mealType.filter((_, i) => i !== index);
                  setMealType(updated);
                  handleChange('mealType', updated);
                }}
                className="btn btn-error"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updated = [...mealType, ''];
              setMealType(updated);
              handleChange('mealType', updated);
            }}
            className="btn btn-outline"
          >
            + Add Meal Type
          </button>
        </div>
      </div>
    </div>
  );
}