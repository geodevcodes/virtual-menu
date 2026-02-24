export const MenuSkeleton = () => {
  return (
    <div className="relative w-full rounded overflow-hidden lg:m-2 mb-12">
      <div className="py-4 lg:flex items-center lg:space-x-4">
        <div className="rounded-md font-regular text-xl mb-2  h-[250px] w-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
        <div className="h-[185px] bg-gray-200 rounded w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full"></div>
      </div>
    </div>
  );
};
