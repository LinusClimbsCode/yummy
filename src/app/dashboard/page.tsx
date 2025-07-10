export default function Page() {
  return (
    <div className="h-full bg-base-200/70">
      <div className="hero py-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-8xl font-bold text-secondary bagel-fat-one-regular">Welcome to Your Dashboard</h1>
            <p className="py-4 text-base-content">
              This is your personal space. From here you can manage and review your saved recipes.
            </p>
          </div>
        </div>
      </div>

      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-base-content">Your Saved Recipes</h2>
        {/* TODO: Render list of saved recipes here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Saved recipe cards will go here */}
        </div>
      </section>
    </div>
  );
}