import { setSavedRecipe } from "@/lib/clientFetchHelpers";

export const LikeButtonFunction = async (
  recipeId: number,
  currentIsSaved: boolean = false
) => {
  try {
    const newState = !currentIsSaved;

    await setSavedRecipe(recipeId, newState);

    console.log(`Recipe ${newState ? "liked" : "unliked"}`);
    return newState;
  } catch (error) {
    console.error("Error toggling recipe like:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    alert(`Error: ${errorMessage}`);
    return currentIsSaved;
  }
};
