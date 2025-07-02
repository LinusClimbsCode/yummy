type RecipesCardProps = {
    title?: string;
    image?: string;
    cookTime?: string;
    difficulty?: string;
    date?: string;
    description?: string;
}

export default function RecipesCard({
    title = "Selbstgemachte Schupfnudeln",
    image = "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    cookTime = "40 Min.",
    difficulty = "simpel",
    date = "26.01.2022",
    description = "Originalrezept von Viki Fuchs"
}: RecipesCardProps) {
    return (
        <>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                </div>
            </figure>

            {/* Content Section */}
            <div className="card-body">
                {/* Title */}
                <h2 className="card-title text-xl font-bold">{title}</h2>
                
                {/* Author */}
                {description && (
                    <p className="text-sm text-base-content/70 mb-2">{description}</p>
                )}

                {/* Recipe Meta Information */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="badge badge-outline flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cookTime}
                    </div>
                    <div className="badge badge-outline flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        {difficulty}
                    </div>
                    <div className="badge badge-outline flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {date}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Drucken
                        </button>
                    </div>
                    <button className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Speichern
                    </button>
                </div>
            </div>
        </article>

        {/* Ingredients Section */}
        <article className="card w-full bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">Zutaten</h2>
                
                {/* Servings Calculator */}
                <div className="bg-base-200 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">für</span>
                        <div className="join">
                            <input 
                                type="number" 
                                className="input input-bordered join-item w-20" 
                                defaultValue="4"
                                min="1"
                                max="100"
                                aria-label="Anzahl der Portionen"
                            />
                            <button className="btn btn-primary join-item">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Portionen
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ingredients Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <tbody>
                            <tr>
                                <td className="w-1/3 font-medium">500 g</td>
                                <td className="w-2/3">
                                    Kartoffeln, vorwiegend festkochende, oder aufgewärmte Pellkartoffeln vom Vortag
                                </td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium">150 g</td>
                                <td className="w-2/3">Weizenmehl</td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium">1</td>
                                <td className="w-2/3">
                                    <a href="#" className="link link-primary">Ei(er)</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium">1</td>
                                <td className="w-2/3">Eigelb</td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium"></td>
                                <td className="w-2/3">
                                    <a href="#" className="link link-primary">Salz</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium"></td>
                                <td className="w-2/3">Muskatnuss</td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium"></td>
                                <td className="w-2/3">Weizenmehl zum Bearbeiten</td>
                            </tr>
                            <tr>
                                <td className="w-1/3 font-medium">2 EL</td>
                                <td className="w-2/3">Butter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
        </>
    )
}