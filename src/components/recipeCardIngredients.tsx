"use client"
// IMPORTS
import { useState } from "react"

// TYPES
import type { Ingredient } from '@/types/recipe';

// Render Function
export default function RecipeCardIngredients({
  servings,
  ingredients,
}: {
  servings: number;
  ingredients: Ingredient[];
}) {

    // current state of servings
    const [currentServings, setCurrentServings] = useState(servings);
    // action of changing servings
    const changeServings = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentServings(Number(e.target.value))
}

  return (
    <>
      {/* Ingredients Section */}
      <article className="card w-full bg-base-100/70 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-4xl font-black mb-4">Ingredients</h2>

          {/* Servings Calculator */}
          <div className="bg-base-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">for</span>
              <div className="join">
                <input
                  type="number"
                  className="input input-bordered join-item w-20"
                  value={currentServings}
                  onChange={changeServings}
                  min="1"
                  max="100"
                  aria-label="Amount of servings"
                />
                <span className="text-lg font-semibold"> servings</span>
              </div>
            </div>
          </div>

          {/* Ingredients Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="w-1/3 font-medium">
                      {ingredient.amount * ( currentServings / servings)} {ingredient.unit}
                    </td>
                    <td className="w-2/3">{ingredient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </>
  );
}
