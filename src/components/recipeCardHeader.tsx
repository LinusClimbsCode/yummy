'use client';
// IMPORTS
import { useState } from "react"
import { LikeButtonFunction } from '@/lib/ButtonLikeFunction';
import { DeleteButtonFunction } from '@/lib/ButtonDeleteFunktion';
import { useSession } from "next-auth/react";
import Link from "next/link"
import Image from 'next/image';
import {
  Heart,
  NotebookPen,
  Trash2,
  Link as LucideLink,
  Clock,
  ChefHat,
  ChartNoAxesColumnIncreasing as Chart,
  ShoppingCart,
  Printer,
} from 'lucide-react'; // Import Icons

// TYPE
import { MealType } from '@/types/recipe';
type RecipesCardProps = {
  title: string;
  image: string;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Unknown"
  category: string[];
  author: string;
  recipeId: number;
  recipeUserId: string;
  mealType: MealType | undefined;
};

/**
 * Renders the header from recipe card, it shows different information
 * about the recipe and display the picture. also it has some button function:
 * a like button, a copy recipe link button, a print button,
 * if a user is logged in and it is his recipe also a edit and delete button
 *
 * @param title - name of the recipe - headline (string)
 * @param image - picture of recipe - URL (string)
 * @param cookTime - cooking time (number)
 * @param difficulty - as "Easy" | "Medium" | "Hard" (string)
 * @param category - all the categories what fits to the recipe like "Pizza" or "Italian" (string[])
 * @param author - name of recipe author (string)
 * @param recipeId - unique identifier for the recipe (string)
 * @param recipeUserId - unique identifier for the recipe's author (string)
 * @param mealType - "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert" | "Brunch" | "Other" (string)
 *
 * @returns React.JSX.Element The rendered recipe header for the recipe card
 */
export default function RecipeCardHeader({
  title,
  image,
  cookTime,
  difficulty,
  category,
  author,
  mealType,
  recipeId,
  recipeUserId,
  isSaved,
}: RecipesCardProps): React.JSX.Element {
  // get current URL and at to clipboard
  const handleCopyPathname = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    navigator.clipboard.writeText(window.location.href);
  };
  // print whole page
  const handlePrint = (): void => {
    window.print();
  };
  
  // handle like
    const [isLiked, setIsLiked] = useState(isSaved)
  
    const handleLikeClick = async () => {
      setIsLiked(isLiked ? false : true)
      LikeButtonFunction(recipeId, isLiked)
    }

    // check user 
    const { data: session } = useSession();

  return (
    <article className="card w-full bg-base-100/70 shadow-xl">
      {/* Image Section */}
      <figure className="relative h-64">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleCopyPathname}
            className="btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100"
          >
            <LucideLink size={14} />
          </button>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-6xl bagel-fat-one-regular">{title}</h2>

        {/* Author */}
        {author && (
          <p className="text-2xl font-black text-secondary mb-2">
            Original recipe from <span className="text-accent italic">{author}</span>
          </p>
        )}

        {/* Recipe Meta Information */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="badge badge-outline flex items-center gap-1">
            <Clock size={14} />
            {`${cookTime} Min.`}
          </div>
          <div className="badge badge-outline flex items-center gap-1">
            <Chart size={14} />
            {difficulty}
          </div>
          <div className="badge badge-outline flex items-center gap-1">
            <ChefHat size={14} />
            {mealType}
          </div>
          {category.map((item) => (
            <div
              key={item}
              className="badge badge-outline flex items-center gap-1"
            >
              <ShoppingCart size={14} />
              {item}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {/* Action Button Printer */}
        <div className="card-actions justify-between items-center">
          <div className="flex gap-2">
            <button onClick={handlePrint} className="btn btn-sm btn-outline">
              <Printer size={14} />
              Print
            </button>
          </div>
          <div className="flex gap-2">
            {/* Action Button Like */}
            <button onClick={handleLikeClick} className="btn btn-outline">
              <Heart size={14} fill={isLiked ? "red" : "none"}/>
              Save
            </button>
            {/* Action Button Edit */}
            <Link href={`/dashboard/edit-recipe/${recipeId}`} className="btn btn-primary">
              <NotebookPen size={14} />
              Edit
            </Link>
            {/* Action Button Delete */}
            <button onClick={() => DeleteButtonFunction(recipeId, recipeUserId, session?.user?.id)} className="btn btn-error">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
