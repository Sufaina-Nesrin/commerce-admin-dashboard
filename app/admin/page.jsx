"use client";

import DashboardCard from "@/components/DashboardCard";
import { getDashboardCounts } from "@/lib/firestore/dashboard";
import { useEffect, useState } from "react";
import { Package, LayoutGrid, ImageIcon, ArrowUpRight } from "lucide-react";
import DashboardSkeleton from "@/components/DashboardSkelton";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    banners: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      setLoading(true);

      const data = await getDashboardCounts();

      setCounts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
  return <DashboardSkeleton />
}
  return (
  <div className="min-h-full w-full">

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Welcome back, Admin
      </h1>

      <p className="text-gray-500 mt-2 text-lg">
        Monitor your store performance,
        products, categories, and banners
        from one place.
      </p>

    </div>


    {/* STATS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* PRODUCTS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black to-gray-800 p-6 shadow-xl">

        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-start justify-between">

          <div>

            <p className="text-gray-300 text-sm font-medium uppercase tracking-wider">
              Total Products
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {counts?.products}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">

              <ArrowUpRight size={16} />

              <span>
                Products available in store
              </span>

            </div>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">

            <Package
              size={28}
              className="text-white"
            />

          </div>

        </div>
      </div>


      {/* CATEGORIES */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-xl">

        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-start justify-between">

          <div>

            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
              Categories
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {counts?.categories}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-blue-100 text-sm">

              <ArrowUpRight size={16} />

              <span>
                Product categories created
              </span>

            </div>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">

            <LayoutGrid
              size={28}
              className="text-white"
            />

          </div>

        </div>
      </div>


      {/* BANNERS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-700 p-6 shadow-xl">

        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-start justify-between">

          <div>

            <p className="text-green-100 text-sm font-medium uppercase tracking-wider">
              Homepage Banners
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
              {counts?.banners}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-green-100 text-sm">

              <ArrowUpRight size={16} />

              <span>
                Promotional banners active
              </span>

            </div>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">

            <ImageIcon
              size={28}
              className="text-white"
            />

          </div>

        </div>
      </div>

    </div>


    {/* OVERVIEW SECTION */}
    <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Store Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your ecommerce store
            efficiently with real-time
            insights and controls.
          </p>

        </div>

        <button className="px-6 py-3 rounded-2xl bg-black text-white hover:opacity-90 transition-all shadow-lg">
          View Analytics
        </button>

      </div>

    </div>
  </div>
)
}
