import { Suspense } from "react"
import Loading from "@/components/loading"
import RecipeCardHeader from "@/components/recipeCardHeader"
import RecipeCardIngredient from "@/components/recipieCardIngrediance"
import RecipeCardDescription from "@/components/recipieCardDescription"
import { fetchRecipeById } from "@/lib/fetchRecipeById";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    
    // Fetch recipe data
    const recipeData = await fetchRecipeById(Number(id));

    return (
        <>
        <Suspense fallback={<Loading />}>
          <RecipeCardHeader 
            title={recipeData.name}
            image={recipeData.image || undefined}
            cookTime={`${recipeData.cookTime} Min.`}
            difficulty={recipeData.difficulty}
            category={recipeData.tags}
            author={recipeData.username}
          />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardIngredient servings={recipeData.servings} />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardDescription 
            instructions={recipeData.instructions}
            prepTime={recipeData.prepTime}
            cookTime={recipeData.cookTime}
            username={recipeData.username}
          />
        </Suspense> 
        </>
    )
}