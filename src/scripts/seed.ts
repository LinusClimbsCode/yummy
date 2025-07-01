import "dotenv/config";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema/schema";

const run = async () => {
  const response = await fetch("https://dummyjson.com/recipes?limit=100");
  const data = await response.json();

  // Insert recipe and return ID
  for (const recipe of data.recipes) {
    const inserted = await db
      .insert(schema.recipes)
      .values({
        name: recipe.name,
        instructions: recipe.instructions,
        prepTime: recipe.prepTimeMinutes,
        cookTime: recipe.cookTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        calories: recipe.caloriesPerServing,
        rating: recipe.rating,
        reviewCount: recipe.reviewCount,
        image: recipe.image,
        userId: null, // Muss angepasst werden sobald Auth steht
      })
      .returning({ id: schema.recipes.id });

    const recipeId = inserted[0]?.id;
    if (!recipeId) continue;

    // Ingredients
    if (recipe.ingredients?.length) {
      await db.insert(schema.ingredients).values(
        recipe.ingredients.map((name: string) => ({
          recipeId,
          name,
        }))
      );
    }

    // Tags
    if (recipe.tags?.length) {
      await db.insert(schema.tags).values(
        recipe.tags.map((tag: string) => ({
          recipeId,
          tag,
        }))
      );
    }

    // Meal types
    if (recipe.mealType?.length) {
      await db.insert(schema.mealTypes).values(
        recipe.mealType.map((mealType: string) => ({
          recipeId,
          mealType,
        }))
      );
    }

    console.log(`✅ Imported recipe: ${recipe.name}`);
  }

  console.log("🎉 All recipes have been seeded.");
};

run().catch((err) => {
  console.error("❌ Seed failed:", err);
});
