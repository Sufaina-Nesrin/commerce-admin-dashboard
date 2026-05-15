export const BannerSkelton =() => {
  return (
    <div className="animate-pulse bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">

      {/* IMAGE */}
      <div className="h-[180px] sm:h-[220px] md:h-[240px] w-full bg-gray-200" />

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex items-center justify-between">

        <div className="flex-1">

          {/* TITLE */}
          <div className="h-5 w-40 bg-gray-200 rounded-lg" />

          {/* SUBTITLE */}
          <div className="h-4 w-24 bg-gray-100 rounded-lg mt-3" />

        </div>

        {/* STATUS */}
        <div className="h-8 w-20 bg-gray-200 rounded-full" />

      </div>

    </div>
  )
}