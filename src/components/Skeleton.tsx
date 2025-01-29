
const Skeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-5 max-w-screen-xl pt-12 animate-pulse">
                <div className="col-span-8 space-y-4">
                    {/* Title Placeholder */}
                    <div className="h-10 bg-gray-300 rounded"></div>
                    {/* Date Placeholder */}
                    <div className="h-4 bg-gray-300 rounded"></div>
                    {/* Content Placeholders */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="col-span-4 pl-4 space-y-4">
                    {/* Author Section */}
                    <div className="h-6 bg-gray-300 rounded"></div>
                    {/* Avatar Placeholder */}
                    <div className="flex w-full pt-4">
                        <div className="px-4 flex-col justify-center">
                            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;


export const BlogCardSkeleton = () => {
    return (
        <div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer animate-pulse">
            <div className="flex items-center space-x-2">
                {/* Avatar Skeleton */}
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                
                {/* Author Name Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                
                {/* Circle Separator Skeleton */}
                <div className="h-1 w-1 mx-2 bg-gray-300 rounded-full"></div>
                
                {/* Date Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-300 rounded mt-2 w-3/4"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-2 mt-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
            
            {/* Read Time Skeleton */}
            <div className="h-4 bg-gray-300 rounded mt-4 w-24"></div>
        </div>
    );
};

export const ProfileSkeleton = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Section Skeleton */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 animate-pulse">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-gray-300"></div>
              <div className="flex-1 w-full">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/5"></div>
                  <div className="h-32 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Blogs Section Skeleton */}
          <div className="bg-white rounded-3xl shadow-lg p-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
