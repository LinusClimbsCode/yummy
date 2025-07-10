export default function Page() {
  const catImages = Array.from({ length: 150 }, (_, i) => (
    <img
      key={i}
      src={`https://cataas.com/cat?${i}`}
      alt={`Cat ${i}`}
      className="aspect-square object-cover w-full rounded-lg shadow"
    />
  ));

  return (
    <div className="min-h-screen p-6 bg-base-100">
      <h1 className="text-6xl bagel-fat-one-regular text-secondary mb-6 text-center">Settings? <br /> More like Cattings 😺</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catImages}
      </div>
    </div>
  );
}