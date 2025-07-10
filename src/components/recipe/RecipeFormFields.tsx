'use client';

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import type { RecipeFormData, MealType } from "@/types/recipe";
import Image  from 'next/image';
import ImageUploader from "@/components/image/ImageUploader";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface RecipeFormFieldsProps {
  defaultValues?: RecipeFormData;
  onChange?: (field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) => void;
  fieldErrors?: Record<string, string>;
}


const UNIT_OPTIONS = [
  "grams", "kilograms", "milliliters", "ounces", "pounds", "cups", "teaspoons", "tablespoons", "pieces"
];
// Meal type options
const MEAL_TYPE_OPTIONS = [
  "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Brunch", "Other"
];

// RecipeFormFields component
const RecipeFormFields = forwardRef(function RecipeFormFields(
  { defaultValues = {}, onChange, fieldErrors = {} }: RecipeFormFieldsProps,
  ref
) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    defaultValues.ingredients || []
  );
  const [name, setName] = useState(defaultValues.name || "");
  const [instructions, setInstructions] = useState<string[]>(
    Array.isArray(defaultValues.instructions)
      ? defaultValues.instructions
      : (defaultValues.instructions ? [defaultValues.instructions] : [])
  );
  const [prepTime, setPrepTime] = useState<number>(defaultValues.prepTime || 0);
  const [cookTime, setCookTime] = useState<number>(defaultValues.cookTime || 0);
  const [mealType, setMealType] = useState<string>(defaultValues.mealType || "");
  const ingredientRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [tags, setTags] = useState<string[]>(defaultValues.tags || []);
  const [servings, setServings] = useState<number>(defaultValues.servings || 2);
  const [difficulty, setDifficulty] = useState<string>(defaultValues.difficulty || "Unknown");
  const [calories, setCalories] = useState<number>(defaultValues.calories || 0);
  const [imagePreview, setImagePreview] = useState(defaultValues.image || "");


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
      setCustomCuisine("");
    }
  };

  const handleCustomCuisine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCuisine(e.target.value);
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
  };

  // Remove an ingredient row
  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  // Add new ingredient row
  const addIngredient = () => {
    const updated = [...ingredients, { name: "", amount: 0, unit: UNIT_OPTIONS[0] }];
    setIngredients(updated);
    setTimeout(() => {
      const lastIndex = updated.length - 1;
      ingredientRefs.current[lastIndex]?.focus();
    }, 0);
  };

  useImperativeHandle(ref, () => ({
    getValues: (): RecipeFormData => {
      return {
        id: defaultValues.id,
        name,
        instructions,
        prepTime,
        cookTime,
        servings,
        difficulty,
        cuisine:
          selectedCuisine === "Other"
            ? customCuisine
            : selectedCuisine,
        calories,
        image: imagePreview,
        tags,
        ingredients,
        mealType: mealType as MealType | undefined,
      };
    },
  }));

  return (
    <div className="space-y-4">
      {/* Recipe Name */}
      <div>
        <label className="font-semibold mb-1 block" htmlFor="name">Recipe Name</label>
        <input
          type="text"
          placeholder="Recipe name"
          defaultValue={defaultValues.name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          id="name"
          autoComplete="off" // Prevent browser from autofilling
        />
        {fieldErrors.name && (
          <p className="text-error">{fieldErrors.name}</p>
        )}
      </div>
      {/* Instructions */}
      <div>
        <label className="font-semibold flex items-center gap-2 mb-1">
          <span>Instructions</span>
          <span className="text-base-content/70 text-xs">(step-by-step, separate by line)</span>
        </label>
        <textarea
          placeholder="Write detailed, step-by-step instructions. Separate each step with a new line."
          value={Array.isArray(instructions) 
        ? instructions.join('\n') 
        : (instructions || "")}
          onChange={(e) => {
        // Split by newlines to create array of strings
        const instructionsArray = e.target.value.split('\n');
        setInstructions(instructionsArray);
          }}
          className="textarea textarea-bordered w-full resize-y bg-base-100"
          rows={8}
          autoComplete='off'
        />
        {fieldErrors.instructions && (
          <p className="text-error">{fieldErrors.instructions}</p>
        )}
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
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="prepTime"
            min={0} // Ensure no negative values
            step={1} // Step by 1 minute
            autoComplete="off" // Prevent browser from autofilling
          />
          {fieldErrors.prepTime && (
            <p className="text-error">{fieldErrors.prepTime}</p>
          )}
        </div>
        {/* Cook Time */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="cookTime">Cook Time (min)</label>
          <input
            type="number"
            placeholder="Cook time (min)"
            defaultValue={defaultValues.cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="cookTime"
            min={0} // Ensure no negative values
            step={1} // Step by 1 minute
            autoComplete="off" // Prevent browser from autofilling
          />
          {fieldErrors.cookTime && (
            <p className="text-error">{fieldErrors.cookTime}</p>
          )}
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
            onChange={(e) => setServings(parseInt(e.target.value))}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {fieldErrors.servings && (
            <p className="text-error">{fieldErrors.servings}</p>
          )}
        </div>
        {/* Difficulty */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="difficulty">Difficulty</label>
          <select
            className="select select-bordered w-full"
            id="difficulty"
            defaultValue={defaultValues.difficulty || "Unknown"}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Unknown">Unknown</option>
          </select>
          {fieldErrors.difficulty && (
            <p className="text-error">{fieldErrors.difficulty}</p>
          )}
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
          {fieldErrors.cuisine && (
            <p className="text-error">{fieldErrors.cuisine}</p>
          )}
        </div>
        {/* Calories */}
        <div>
          <label className="font-semibold mb-1 block" htmlFor="calories">Calories</label>
          <input
            type="number"
            placeholder="Calories"
            defaultValue={defaultValues.calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
            className="input input-bordered w-full"
            id="calories"
          />
          {fieldErrors.calories && (
            <p className="text-error">{fieldErrors.calories}</p>
          )}
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
            setImagePreview(e.target.value);
          }}
          className="input input-bordered w-full"
          id="image"
          autoComplete="off" // Prevent browser from autofilling
        />
        {fieldErrors.image && (
          <p className="text-error">{fieldErrors.image}</p>
        )}
      </div>
      {/* Image upload */}
      <div>
        <label className="font-semibold mb-1 block" htmlFor="image-upload">Upload Image</label>
        <ImageUploader onUpload={(url) => {
          setImagePreview(url);
        }} />
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
            priority
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
        {fieldErrors.ingredients && (
          <p className="text-error">{fieldErrors.ingredients}</p>
        )}
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
                }}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = tags.filter((_, i) => i !== index);
                  setTags(updated);
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
            }}
            className="btn btn-outline"
          >
            + Add Tag
          </button>
        </div>
      </div>
      {/* MealType field group */}
      <div>
        <label className="font-semibold mb-1 block" htmlFor="mealType">Meal Type</label>
        <div className="flex gap-2 items-center">
          <select
            className="select select-bordered w-full"
            id="mealType"
            value={mealType}
            onChange={(e) => {
              const value = e.target.value;
              setMealType(value);
            }}
          >
            <option value="" disabled>Select meal type</option>
            <option value="Breakfast">Frühstück</option>
            <option value="Lunch">Mittagessen</option>
            <option value="Dinner">Abendessen</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
            <option value="Brunch">Brunch</option>
            <option value="Other">Other</option>
          </select>
          {mealType && (
            <button
              type="button"
              onClick={() => {
                setMealType("");
              }}
              className="btn btn-error"
              aria-label="Clear meal type"
            >
              ✕
            </button>
          )}
        </div>
        {fieldErrors.mealType && (
          <p className="text-error">{fieldErrors.mealType}</p>
        )}
      </div>

    </div>
  );
});
export default RecipeFormFields;