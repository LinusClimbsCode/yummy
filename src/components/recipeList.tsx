"use client"
// IMPORTS
import Link from 'next/link';
import Image from 'next/image';
import { useState } from "react"
import { Heart, NotebookPen, Trash2 } from 'lucide-react'; // icons for buttons


// TYPES
import { RecipePreview } from "@/types/recipe"
import { set } from 'zod/v4';


/**
 * Renders a recipe list item with image, details, and favorite button
 * Displays recipe information in a card format with navigation link
 * @param id - Unique recipe identifier for navigation
 * @param name - Recipe name to display
 * @param image - Recipe image URL (nullable)
 * @param totalTime - Total cooking time in minutes (nullable)
 * @param tags - Array of recipe tags/categories
 * @param cuisine - Recipe cuisine type (nullable)
 * @param difficulty - Recipe difficulty level
 * @returns React.JSX.Element The rendered list item
 */
export default function RecipeList({ id, name, image, totalTime, tags, cuisine, difficulty, }: RecipePreview): React.JSX.Element {

  const [isSaved, setIsSaved] = useState(false)

  const handleLikeClick = async () => {
    setIsSaved(isSaved ? false : true)
  }

  return (
    <>
    {/* total list component */}
    <li className="list-row w-full flex justify-between p-4">
    {/* Link so whole listItem is clickable and links to recipeCard */}
      <Link href={`/recipes/${id}`} className="flex items-center flex-1 gap-4">
      {/* Image */}
        <div className="avatar">
          <div className="mask mask-hexagon-2 w-24">
            <Image src={image} alt={name} fill className='object-cover'/>
          </div>
        </div>
        {/* Headline */}
        <div>
          <div>{name}</div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-1">
            {cuisine && <div className="badge badge-outline">{cuisine}</div>}
            {totalTime && (
              <div className="badge badge-outline">{totalTime} min</div>
            )}
            {difficulty && (
              <div className="badge badge-outline">{difficulty}</div>
            )}
            {tags.map((tag: string, index: number) => (
              <div key={`tag-${tag}-${index}`} className="badge badge-outline">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </Link>
      {/* Buttons, not included in Link for recipeCard*/}
      <div className="flex flex-col flex-shrink-0 gap-1">
        {/* Like button*/}
        <button className="btn btn-square btn-ghost" onClick={handleLikeClick}>
          <Heart fill={isSaved ? "red" : "none"}/>
        </button>
        {/* Edit button*/}
        <Link href={`/dashboard/edit-recipe/${id}`} className="btn btn-square btn-ghost">
          <NotebookPen />
        </Link>
        {/* Delete button*/}
        <button className="btn btn-square btn-ghost">
          <Trash2 />
        </button>
      </div>
    </li>
  </>
  );
}
