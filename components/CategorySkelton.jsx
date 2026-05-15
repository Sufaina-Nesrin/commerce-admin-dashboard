export default function CategorySkeleton() {
  return (
    <div className="animate-pulse">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>

          <div className="h-10 w-64 bg-gray-200 rounded-xl" />

          <div className="h-5 w-80 bg-gray-100 rounded-xl mt-3" />

        </div>

        <div className="h-12 w-40 bg-gray-200 rounded-2xl" />

      </div>


      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {[...Array(6)].map((_, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex-1">

                {/* CATEGORY NAME */}
                <div className="h-6 w-40 bg-gray-200 rounded-xl" />

                {/* PRODUCT COUNT */}
                <div className="h-4 w-28 bg-gray-100 rounded-lg mt-4" />

              </div>

              {/* ACTION BUTTON */}
              <div className="w-10 h-10 rounded-full bg-gray-200" />

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}