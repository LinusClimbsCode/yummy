export default function ListSkeleton() {
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            {[1, 2, 3].map((item) => (
                <li key={item} className="list-row w-full flex justify-between p-4">
                    <div className='flex item-center flex-1 gap-4'>
                        {/* Avatar skeleton */}
                        <div className="avatar">
                            <div className="mask mask-hexagon-2 w-24">
                                <div className="skeleton w-24 h-24"></div>
                            </div>
                        </div>
                        {/* Text content skeleton */}
                        <div className="flex flex-col gap-2">
                            <div className="skeleton h-4 w-32"></div>
                            <div className="skeleton h-3 w-24"></div>
                        </div>
                    </div>
                    {/* Button skeleton */}
                    <div className='flex flex-shrink-0 gap-2'>
                        <div className="skeleton w-10 h-10"></div>
                    </div>
                </li>
            ))}
        </ul>
    )
}