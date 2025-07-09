'use client';
// IMPORTS
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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  author: string;
  recipeId: string;
  mealType: MealType;
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
  // recipeId,
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

  return (
    <article className="card w-full bg-base-100 shadow-xl">
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
        <h2 className="card-title text-xl font-bold">{title}</h2>

        {/* Author */}
        {author && (
          <p className="text-sm text-base-content/70 mb-2">
            Original recipe from {author}
          </p>
        )}

        {/* Recipe Meta Information */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="badge badge-outline flex items-center gap-1">
            <Clock size={14} />
            {cookTime}
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
            <button className="btn btn-outline">
              <Heart size={14} />
              Save
            </button>
            {/* Action Button Edit */}
            <button className="btn btn-primary">
              <NotebookPen size={14} />
              Edit
            </button>
            {/* Action Button Delete */}
            <button className="btn btn-error">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
