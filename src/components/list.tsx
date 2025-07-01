import Link from 'next/link';

export default function List({
  image,
  title,
  description,
  id,
}: {
  image: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <li className="list-row w-full flex justify-between p-4">
      <Link href={`/recipes/${id}`} className='flex item-center flex-1 gap-4'>
        <div className="avatar">
          <div className="mask mask-hexagon-2 w-24">
            <img src={image} alt={title} />
          </div>
        </div>
        <div>
          <div>{title}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {description}
          </div>
        </div>
      </Link>
      <div className='flex flex-shrink-0 gap-2'>
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
