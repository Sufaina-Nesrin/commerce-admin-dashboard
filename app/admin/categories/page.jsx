"use client";

import { Plus, Trash2, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "@/lib/firestore/category";
import CategorySkeleton from "@/components/CategorySkelton";
import toast from 'react-hot-toast'

export default function CategoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  // const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: "Electronics",
  //     products: 12,
  //   },
  //   {
  //     id: 2,
  //     name: "Fashion",
  //     products: 8,
  //   },
  //   {
  //     id: 3,
  //     name: "Home Decor",
  //     products: 4,
  //   },
  //   {
  //     id: 4,
  //     name: "Shoes",
  //     products: 6,
  //   },
  // ]);

  const handleAddCategory = async () => {
    try {
      if (!category.trim()) {
      toast.error("Category name is required");
        return;
      }
      let res = await addCategory({
        name: category,
      });
      console.log("res--", res);

      toast.success('Category Added Successfully')
      setCategories((cat) => [
        ...cat,
        {
          id: res?.id || null,
          name: category,
          productCount: 0,
        },
      ]);

      setCategory("");

      setShowModal(false);
    } catch (error) {
      console.log(error);

    toast.error(error.message)
    }
  };
  const handleDelete = async () => {
    console.log("selected category--", selectedCategory);

    try {
      if (selectedCategory.productCount > 0) {
        alert("Cannot delete category linked with products");

        return;
      }

      await deleteCategory(selectedCategory.id);

      const filtered = categories.filter(
        (item) => item.id !== selectedCategory.id,
      );

      setCategories(filtered);

      setShowDeleteModal(false);

      setSelectedCategory(null);

      toast.success("Category Deleted Successfully");
    } catch (err) {
      console.log(err);

    toast.error(err.message)
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Management
          </h1>

          <p className="text-gray-500 mt-1">
            Organize and manage product categories
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:opacity-90 transition-all shadow-lg text-sm sm:text-base"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>
      {loading ? (
        <CategorySkeleton />
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            No categories found
          </h2>

          <p className="text-gray-500 mt-2">Create your first category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                    <FolderKanban size={24} />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.productCount} Products
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(item);
                    setShowDeleteModal(true);
                  }}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-all shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {item.productCount > 0 && (
                <div className="mt-5 bg-yellow-50 text-yellow-700 text-sm p-3 rounded-2xl border border-yellow-100">
                  This category is linked with products.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Category</h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                placeholder="Enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 border border-gray-200 text-gray-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl text-gray-800 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCategory}
                className="w-full py-3 rounded-2xl bg-black text-white hover:opacity-90 transition-all"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Delete Category
            </h2>

            <p className="text-gray-500 mt-3">
              Are you sure you want to delete this category?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
