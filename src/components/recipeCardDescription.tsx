import Image from "next/image"

type RecipeCardDescriptionProps = {
    instructions?: string[];
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    username?: string;
}

export default function RecipeCardDescription({ 
    instructions,
    prepTime,
    cookTime,
    username
}: RecipeCardDescriptionProps) {


  return (
    <>
      {' '}
      {/* Preparation Section */}
      <article className="card w-full bg-base-100 shadow-xl mt-6">
        <div className="card-body">
            <h2 className="card-title text-4xl font-black mb-4">Preparation</h2>

          {/* Timing Information */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="badge badge-outline flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Preperation time about {prepTime || 'Unknown'} min
            </div>
            <div className="badge badge-outline flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cooking time about {cookTime || 'Unknown'} min
            </div>

          </div>

          {/* Instructions */}
          <div className="prose max-w-none">
            <div>
              <ol className="list-decimal list-inside space-y-3">
                {instructions?.map((step, index) => {
                  return <li key={index} className="text-base leading-relaxed">{step}</li>
                })}
              </ol>
            </div>
          </div>


          {/* Recipe Author */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <h3 className="text-lg font-semibold mb-4">Recipie from</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <Image
                    src="https://cdn.pixabay.com/photo/2023/10/12/08/24/bird-8310183_1280.png"
                    alt={`Profilpicture von ${username || 'Unknown Chef'}`}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-black text-4xl text-secondary italic">{username || 'Unknown Chef'}</h4>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
