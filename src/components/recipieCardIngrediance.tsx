export default function RecipeCardIngredient() {
    return (
        <>
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
    );
};
