import { Suspense } from "react"
import Loading from "./loading"
import RecipeCardHeader from "./recipeCardHeader"
import RecipeCardIngredient from "./recipieCardIngrediance"
import RecipeCardDescription from "./recipieCardDescription"


export default function RecipesCard() {
    return (
        <>
        <Suspense fallback={<Loading />}>
          <RecipeCardHeader />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardIngredient />
        </Suspense> 
        <Suspense fallback={<Loading />}>
          <RecipeCardDescription />
        </Suspense> 
        </>
    )
}