export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">

      {/* HEADER */}
      <div className="mb-8">

        <div className="h-10 w-72 bg-gray-200 rounded-xl" />

        <div className="h-5 w-96 bg-gray-100 rounded-xl mt-4" />

      </div>


      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {[...Array(3)].map((_, index) => (

          <div
            key={index}
            className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-200"
          >

            <div className="flex items-start justify-between">

              <div className="flex-1">

                {/* TITLE */}
                <div className="h-4 w-32 bg-gray-200 rounded-lg" />

                {/* VALUE */}
                <div className="h-12 w-24 bg-gray-300 rounded-xl mt-6" />

                {/* SUBTEXT */}
                <div className="h-4 w-40 bg-gray-100 rounded-lg mt-5" />

              </div>

              {/* ICON */}
              <div className="w-14 h-14 rounded-2xl bg-gray-200" />

            </div>

          </div>

        ))}

      </div>


      {/* OVERVIEW SECTION */}
      <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex-1">

            <div className="h-7 w-52 bg-gray-200 rounded-xl" />

            <div className="h-4 w-full max-w-md bg-gray-100 rounded-xl mt-4" />

            <div className="h-4 w-72 bg-gray-100 rounded-xl mt-2" />

          </div>

          <div className="h-12 w-40 bg-gray-200 rounded-2xl" />

        </div>

      </div>

    </div>
  )
}