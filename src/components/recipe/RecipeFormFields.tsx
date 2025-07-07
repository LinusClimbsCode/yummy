'use client';

import { useState, useRef } from 'react';
import type { RecipeFormData } from "@/types/recipe";
import Image  from 'next/image';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface RecipeFormFieldsProps {
  defaultValues?: RecipeFormData;
  onChange?: (field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) => void;
}

const UNIT_OPTIONS = [
  "grams", "kilograms", "milliliters", "ounces", "pounds", "cups", "teaspoons", "tablespoons", "pieces"
];

export default function RecipeFormFields({ defaultValues = {}, onChange }: RecipeFormFieldsProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    defaultValues.ingredients || []
  );
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [tags, setTags] = useState<string[]>(defaultValues.tags || []);
  const [mealType, setMealType] = useState<string[]>(defaultValues.mealType || []);
  const [imagePreview, setImagePreview] = useState(defaultValues.image || "");

  const handleChange = (field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) => {
    onChange?.(field, value);
    console.log('handleChange:', field, value);
  };

  // Cuisine options and state for cuisine selection
  const CUISINE_OPTIONS = [
    "African", "American", "Asian", "British", "Caribbean", "Chinese",
    "Eastern European", "French", "German", "Greek", "Indian", "Italian",
    "Japanese", "Korean", "Latin American", "Mediterranean", "Mexican",
    "Middle Eastern", "Nordic", "Southeast Asian", "Spanish", "Thai",
    "Turkish", "Vietnamese", "Other"
  ];
  const [selectedCuisine, setSelectedCuisine] = useState<string>(
    CUISINE_OPTIONS.includes(defaultValues.cuisine || "")
      ? defaultValues.cuisine || ""
      : (defaultValues.cuisine ? "Other" : "")
  );
  const [customCuisine, setCustomCuisine] = useState<string>(
    (defaultValues.cuisine && !CUISINE_OPTIONS.includes(defaultValues.cuisine))
      ? defaultValues.cuisine
      : ""
  );
  const handleCuisineSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCuisine(value);
    if (value !== "Other") {
      handleChange('cuisine', value);
      setCustomCuisine("");
    } else {
      handleChange('cuisine', customCuisine || "");
    }
  };
  const handleCustomCuisine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCuisine(e.target.value);
    handleChange('cuisine', e.target.value);
  };

  // Handler for updating a single field of an ingredient
  const handleIngredientChange = (
    index: number,
    key: keyof Ingredient,
    value: Ingredient[keyof Ingredient]
  ) => {
    const updated = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [key]: value } : ingredient
    );
    setIngredients(updated);
    handleChange('ingredients', updated as RecipeFormData['ingredients']);
  };

  // Remove an ingredient row
  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
    handleChange('ingredients', updated as RecipeFormData['ingredients']);
  };

  // Add new ingredient row
  const addIngredient = () => {
    const updated = [...ingredients, { name: "", amount: 0, unit: UNIT_OPTIONS[0] }];
    setIngredients(updated);
    setTimeout(() => {
      const lastIndex = updated.length - 1;
      ingredientRefs.current[lastIndex]?.focus();
    }, 0);
    handleChange('ingredients', updated as RecipeFormData['ingredients']);
  };

  return (
    <div className="space-y-4">
      {/* Recipe Name */}
      <div>
        <label className="font-semibold mb-1 block" htmlFor="name">Recipe Name</label>
        <input
          type="text"
          placeholder="Recipe name"
          defaultValue={defaultValues.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input input-bordered w-full"
          id="name"
          autoComplete="off" // Prevent browser from autofilling
        />
      </div>
      {/* Instructions */}
      <div>
        <label className="font-semibold flex items-center gap-2 mb-1">
          <span>Instructions</span>
          <span className="text-base-content/70 text-xs">(step-by-step, separate by line)</span>
        </label>
        <textarea
          placeholder="Write detailed, step-by-step instructions. You can use line breaks for new steps."
          defaultValue={defaultValues.instructions}
          onChange={(e) => handleChange('instructions', e.target.value)}
          className="textarea textarea-bordered w-full resize-y bg-base-100"
          rows={8}
          autoComplete='off' // Prevent browser from autofilling
        />
      </div>
      {/* Grouped grid for prep/cook/servings/difficulty/cuisine/calories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Prep Time */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="prepTime">Prep Time (min)</label>
          <input
            type="number"
            placeholder="Prep time (min)"
            defaultValue={defaultValues.prepTime}
            onChange={(e) => handleChange('prepTime', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="prepTime"
            min={0} // Ensure no negative values
            step={1} // Step by 1 minute
            autoComplete="off" // Prevent browser from autofilling
          />
        </div>
        {/* Cook Time */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="cookTime">Cook Time (min)</label>
          <input
            type="number"
            placeholder="Cook time (min)"
            defaultValue={defaultValues.cookTime}
            onChange={(e) => handleChange('cookTime', parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="cookTime"
            min={0} // Ensure no negative values
            step={1} // Step by 1 minute
            autoComplete="off" // Prevent browser from autofilling
          />
        </div>
        {/* Portions? */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="servings">
            Portions?
          </label>
          <select
            className="select select-bordered w-full"
            id="servings"
            defaultValue={defaultValues.servings || 2}
            onChange={(e) => handleChange('servings', parseInt(e.target.value))}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        {/* Difficulty */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="difficulty">Difficulty</label>
          <select
            className="select select-bordered w-full"
            id="difficulty"
            defaultValue={defaultValues.difficulty || "Unknown"}
            onChange={(e) => handleChange('difficulty', e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        {/* Cuisine */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="cuisine">Cuisine</label>
          <select
            className="select select-bordered w-full"
            id="cuisine"
            value={selectedCuisine}
            onChange={handleCuisineSelect}
          >
            <option value="" disabled>
              Select cuisine
            </option>
            {CUISINE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {selectedCuisine === "Other" && (
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="Enter custom cuisine"
              value={customCuisine}
              onChange={handleCustomCuisine}
            />
          )}
        </div>
        {/* Calories */}
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
      {/* Image URL */}
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
          autoComplete="off" // Prevent browser from autofilling
        />
      </div>
      {/* Image preview */}
      {imagePreview && (
        <div className="my-2">
          <Image
            src={imagePreview}
            alt="Recipe preview"
            width={256}
            height={128}
            className="max-h-32 rounded shadow object-cover"
            loading="lazy"
            onError={() => setImagePreview("")}
            style={{ objectFit: 'cover' }} 
          />
        </div>
      )}
      {/* Ingredients field group */}
      <div>
        <h3 className="font-semibold text-lg mb-1 mt-6">Ingredients</h3>
        <p className="text-sm text-base-content/70 mb-2">
          List all ingredients required for this recipe. Each ingredient should have a name, amount, and unit.
        </p>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <input
                type="text"
                value={ingredient.name}
                placeholder="Ingredient"
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                className="input input-bordered w-full"
                autoComplete="off"
                ref={el => {
                  ingredientRefs.current[index] = el;
                }}
              />
              <input
                type="number"
                value={ingredient.amount}
                min={0}
                placeholder="Amount"
                onChange={(e) => handleIngredientChange(index, "amount", parseFloat(e.target.value))}
                className="input input-bordered w-full"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                className="select select-bordered w-full"
              >
                {UNIT_OPTIONS.map((unit) => (
                  <option value={unit} key={unit}>{unit}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="btn btn-error text-white self-end"
                aria-label="Remove ingredient"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
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