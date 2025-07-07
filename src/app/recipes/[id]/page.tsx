// IMPORTS
import { Suspense } from "react"
import Loading from "@/components/loading"
import RecipeCardHeader from "@/components/recipeCardHeader"
import RecipeCardIngredient from "@/components/recipieCardIngrediance"
import RecipeCardDescription from "@/components/recipieCardDescription"
import { fetchRecipeById } from "@/lib/fetchRecipeById";

// TYPES
type PageParams = {
    params: Promise<{id: string}>
}
export default async function Page({ params }: PageParams) {
    const { id } = await params
    const recipeID: number = Number(id)
    
    // Fetch recipe data
    const recipe = await fetchRecipeById(recipeID);

    return (
        <>
        <Suspense fallback={<Loading />}>
          <RecipeCardHeader 
            title={recipe.name}
            image={recipe.image || undefined}
            cookTime={`${recipe.cookTime} Min.`}
            difficulty={recipe.difficulty}
            category={recipe.tags}
            author={recipe.username}
          />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardIngredient servings={recipe.servings} />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardDescription 
            instructions= {recipe.instructions}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            username={recipe.username}
          />
        </Suspense> 
        </>
    )
}