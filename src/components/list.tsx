import Link from 'next/link';

export default function List({
  id,
  name,
  image,
  totalTime,
  tags,
  cuisine,
  difficulty,
}: {
  id: number;
  name: string;
  image: string | null;
  totalTime: number | null;
  tags: string[];
  cuisine: string | null;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Unknown';
}) {
  return (
    <li className="list-row w-full flex justify-between p-4">
      <Link href={`/recipes/${id}`} className="flex item-center flex-1 gap-4">
        <div className="avatar">
          <div className="mask mask-hexagon-2 w-24">
            <img src={image || '/placeholder-recipe.jpg'} alt={name} />
          </div>
        </div>
        <div>
          <div>{name}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {cuisine && <div className="badge badge-outline">{cuisine}</div>}
            {totalTime && (
              <div className="badge badge-outline">{totalTime} min</div>
            )}
            {difficulty && (
              <div className="badge badge-outline">{difficulty}</div>
            )}
            {tags.map((tag, index) => (
              <div key={index} className="badge badge-outline">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex flex-shrink-0 gap-2">
        <button className="btn btn-square btn-ghost">
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </g>
          </svg>
        </button>
      </div>
    </li>
  );
}
