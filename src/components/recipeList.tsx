'use client';
// IMPORTS
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LikeButtonFunction } from '@/lib/ButtonLikeFunction';
import { DeleteButtonFunction } from '@/lib/ButtonDeleteFunktion';
import { useSession } from 'next-auth/react';
import { Heart, NotebookPen, Trash2 } from 'lucide-react'; // icons for buttons

// TYPES
import { RecipePreview } from '@/types/recipe';

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
 * @param userId - Unique identifier for the recipe's author
 * @returns React.JSX.Element The rendered list item
 */
export default function RecipeList({
  id,
  name,
  image,
  totalTime,
  tags,
  cuisine,
  difficulty,
  userId,
}: RecipePreview): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeClick = async () => {
    setIsSaved(isSaved ? false : true);
    LikeButtonFunction(id, isSaved);
  };

  // check user
  const { data: session } = useSession();

  return (
    <>
      {/* total list component */}
      <li className="list-row w-full bg-base-200 flex justify-between mt-8 p-4">
        {/* Link so whole listItem is clickable and links to recipeCard */}
        <Link
          href={`/recipes/${id}`}
          className="flex items-center flex-1 gap-4"
        >
          {/* Image */}
          <div className="avatar">
            <div className="mask mask-squircle w-24">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          </div>
          {/* Headline */}
          <div>
            <div className="text-4xl text-secondary bagel-fat-one-regular">{name}</div>
            <div className="text-xs text-base-content mt-1">Info & Tags:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {cuisine && <div className="badge badge-primary">{cuisine}</div>}
              {cuisine && totalTime && <div className="border-l border-base-content mx-1 h-5 self-center" />}
              {totalTime && (
                <div className="badge badge-success">{totalTime} min</div>
              )}
              {cuisine && totalTime && <div className="border-l border-base-content mx-1 h-5 self-center" />}
              {difficulty && (
                <div className="badge badge-accent">{difficulty}</div>
              )}
              {cuisine && totalTime && <div className="border-l border-base-content mx-1 h-5 self-center" />}
              {tags.map((tag: string, index: number) => (
                <div
                  key={`tag-${tag}-${index}`}
                  className="badge badge-info badge-outline"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Link>
        {/* Buttons, not included in Link for recipeCard*/}
        <div className="flex flex-col flex-shrink-0 gap-1">
          {/* Like button*/}
          <button
            className="btn btn-square btn-ghost"
            onClick={handleLikeClick}
          >
            <Heart fill={isSaved ? 'red' : 'none'} />
          </button>
          {/* Edit button*/}
          <Link
            href={`/dashboard/edit-recipe/${id}`}
            className="btn btn-square btn-ghost"
          >
            <NotebookPen />
          </Link>
          {/* Delete button*/}
          <button
            onClick={() =>
              DeleteButtonFunction(id, userId, session?.user?.id)
            }
            className="btn btn-square btn-ghost"
          >
            <Trash2 />
          </button>
        </div>
      </li>
    </>
  );
}
