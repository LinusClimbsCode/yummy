import { deleteMyRecipe } from "@/lib/clientFetchHelpers";

function canDeleteRecipe(
  recipeUserId: string,
  currentUserId?: string
): boolean {
  return currentUserId === recipeUserId;
}

export const DeleteButtonFunction = async (
  recipeId: number,
  recipeUserId: string,
  sessionUserId?: string
) => {
  if (!canDeleteRecipe(recipeUserId, sessionUserId)) {
    alert("Du hast keine Berechtigung, dieses Recipe zu löschen.");
    return false;
  }

  if (!confirm("Recipe wirklich löschen?")) {
    return false;
  }

  try {
    await deleteMyRecipe(recipeId);
    console.log("Recipe deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    alert(`Delete failed: ${errorMessage}`);
    return false;
  }
};
