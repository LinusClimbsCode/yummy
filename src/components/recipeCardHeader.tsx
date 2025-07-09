// IMPORTS
import { Heart, NotebookPen, Trash2, Link as LucideLink, Clock, ChefHat, ChartNoAxesColumnIncreasing as Chart, ShoppingCart, Printer } from 'lucide-react'; // Import Icons
import { Tr } from 'zod/v4/locales';

// TYPE
type RecipesCardProps = {
    title?: string;
    image?: string;
    cookTime?: string;
    difficulty?: string;
    category?: string[];
    description?: string;
    author?: string;
}

export default function RecipeCardHeader({
    title = "Selbstgemachte Schupfnudeln",
    image = "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    cookTime = "40 Min.",
    difficulty = "simpel",
    category = ["italien", "vegan", "bla"],
    author = "Viki Fuchs"
}: RecipesCardProps) {
    return (
        <article className="card w-full bg-base-100 shadow-xl">
            {/* Image Section */}
            <figure className="relative">
                <img 
                    src={image} 
                    alt={title}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover"
                />
                
                {/* Action buttons overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100">
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
                    <p className="text-sm text-base-content/70 mb-2">Original recipie from {author}</p>
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
                    {category.map((item) => (
                        <div key={item} className="badge badge-outline flex items-center gap-1">
                            <ChefHat size={14} />
                            {item}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                {/* Action Button Printer */}
                <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline">
                            <Printer size={14} />
                            Print
                        </button>
                    </div>
                    <div className="flex gap-2">
                {/* Action Button Like */}
                    <button className="btn btn-primary">
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
    )
}