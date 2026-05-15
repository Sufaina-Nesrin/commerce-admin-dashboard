"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreVertical, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { addBanner, getBanners, deleteBanner } from "@/lib/firestore/banner";
import { uploadImage } from "@/lib/imgbb";
import { BannerSkelton } from "@/components/BannerSkelton";
import toast from "react-hot-toast";

export default function BannerPage() {
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [banners, setBanners] = useState([]);
  const handleAddBanner = async () => {
    try {
      setLoading(true);
      // Upload image first
      const imageUrl = await uploadImage(formData.image);

      // Save product in Firestore
      let resp = await addBanner({
        name: formData.name,
        image: imageUrl,
      });

      toast.success("Product Added");

      setBanners((banner) => [
        ...banner,
        {
          id: resp.id,
          name: formData.name,
          image: imageUrl,
        },
      ]);
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteBanner(selectedBanner.id);

      const filtered = banners?.filter(
        (item) => item.id !== selectedBanner?.id,
      );

      setBanners(filtered);

      setShowDeleteModal(false);

      setSelectedBanner(null);

      toast.success("Banner Deleted Successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Banner Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage homepage banners and promotions
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:opacity-90 transition-all shadow-lg text-sm sm:text-base"
        >
          <Plus size={20} />
          Add Banner
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <BannerSkelton key={index} />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            No banners found
          </h2>

          <p className="text-gray-500 mt-2">
            Upload your first homepage banner.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-[180px] sm:h-[220px] md:h-[240px] w-full overflow-hidden">
                <Image
                  src={banner.image}
                  alt="Banner"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4" ref={menuRef}>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === banner.id ? null : banner.id)
                    }
                    className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <MoreVertical size={18} className="text-gray-700" />
                  </button>

                  {openMenu === banner.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => {
                          setSelectedBanner(banner);
                          setShowDeleteModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={18} />
                        Delete Banner
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {banner?.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1"></p>
                </div>

                <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Banner</h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                <X size={18} color="black" />
              </button>
            </div>

            <div className="grid grid-cols- md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Banner Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-gray-200 text-gray-600 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Image URL
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full mt-2 border border-gray-200 rounded-2xl text-gray-600 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleAddBanner}
                className="w-full py-3 rounded-2xl bg-black text-white hover:opacity-90 transition-all"
              >
                {loading ? (
                  <>
                    {/* SPINNER */}
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                    <span>Adding...</span>
                  </>
                ) : (
                  <>Add Banner</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900">Delete Banner</h2>

            <p className="text-gray-500 mt-3">
              Are you sure you want to delete this banner?
            </p>

            <div className="flex gap-3 mt-6">
              {/* CANCEL BUTTON */}
              <button
                disabled={loading}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBanner(null);
                }}
                className={`
      flex-1 py-3 rounded-2xl transition-all
      ${
        loading
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-100 hover:bg-gray-200"
      }
    `}
              >
                Cancel
              </button>

              {/* DELETE BUTTON */}
              <button
                disabled={loading}
                onClick={handleDelete}
                className={`
      flex-1 py-3 rounded-2xl text-white transition-all flex items-center justify-center gap-2
      ${
        loading
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }
    `}
              >
                {loading ? (
                  <>
                    {/* LOADER */}
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
