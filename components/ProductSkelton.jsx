export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
      
      <div className="h-[220px] bg-gray-200 w-full" />

      <div className="p-5">
        
        <div className="h-6 bg-gray-200 rounded w-2/3" />

        <div className="h-4 bg-gray-200 rounded w-1/3 mt-3" />

        <div className="space-y-2 mt-5">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-11 bg-gray-200 rounded-2xl" />
          <div className="w-11 h-11 bg-gray-200 rounded-2xl" />
        </div>

      </div>
    </div>
  )
}