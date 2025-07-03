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
  const [imagePreview, setImagePreview] = useState(defaultValues.image || "");

  const handleChange = (field: string, value: any) => {
    onChange?.(field, value);
  };

  return (
    /* Recipe Form Fields */
    <div className="space-y-4">
      <div>
        <label className="font-semibold mb-1 block" htmlFor="name">Recipe Name</label>
        <input
          type="text"
          placeholder="Recipe name"
          defaultValue={defaultValues.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input input-bordered w-full"
          id="name"
        />
      </div>
      <div>
        <label className="font-semibold flex items-center gap-2 mb-1">
          <span>Instructions</span>
          <span className="text-base-300 text-xs">(step-by-step, separate by line)</span>
        </label>
        <textarea
          placeholder="Write detailed, step-by-step instructions. You can use line breaks for new steps."
          defaultValue={defaultValues.instructions}
          onChange={(e) => handleChange('instructions', e.target.value)}
          className="textarea textarea-bordered w-full resize-y bg-base-100"
          rows={8}
        />
      </div>
      {/* Grouped grid for prep/cook/servings/difficulty/cuisine/calories */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold mb-1 block" htmlFor="prepTime">Prep Time (min)</label>
          <input
            type="number"
            placeholder="Prep time (min)"
            defaultValue={defaultValues.prepTime}
            onChange={(e) => handleChange('prepTime', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="prepTime"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block" htmlFor="cookTime">Cook Time (min)</label>
          <input
            type="number"
            placeholder="Cook time (min)"
            defaultValue={defaultValues.cookTime}
            onChange={(e) => handleChange('cookTime', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="cookTime"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block" htmlFor="servings">Servings</label>
          <input
            type="number"
            placeholder="Servings"
            defaultValue={defaultValues.servings}
            onChange={(e) => handleChange('servings', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="servings"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block" htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            placeholder="Difficulty"
            defaultValue={defaultValues.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="input input-bordered w-full"
            id="difficulty"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block" htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            placeholder="Cuisine"
            defaultValue={defaultValues.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="input input-bordered w-full"
            id="cuisine"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block" htmlFor="calories">Calories</label>
          <input
            type="number"
            placeholder="Calories"
            defaultValue={defaultValues.calories}
            onChange={(e) => handleChange('calories', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="calories"
          />
        </div>
      </div>
      <div>
        <label className="font-semibold mb-1 block" htmlFor="image">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          defaultValue={defaultValues.image}
          onChange={(e) => {
            handleChange('image', e.target.value);
            setImagePreview(e.target.value);
          }}
          className="input input-bordered w-full"
          id="image"
        />
      </div>
      {imagePreview && (
        <div className="my-2">
          <img
            src={imagePreview}
            alt="Recipe preview"
            className="max-h-32 rounded shadow"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      )}

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