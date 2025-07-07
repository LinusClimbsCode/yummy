"use client"
import { Suspense } from "react"
import Loading from "./loading"
import RecipeCardHeader from "./recipeCardHeader"
import RecipeCardIngredient from "./recipieCardIngredients"
import RecipeCardDescription from "./recipieCardDescription"
import { useParams, usePathname } from "next/navigation"

export default function RecipesCard() {
    const pathname = usePathname()
    const recipeID = pathname.slice(9)

    const params = useParams()

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