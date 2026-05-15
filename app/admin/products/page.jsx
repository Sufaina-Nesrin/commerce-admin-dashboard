"use client";

import Image from "next/image";
import { Pencil, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import ProductSkelton from "@/components/ProductSkelton";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/lib/firestore/product";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/imgbb";
import { getCategories } from "@/lib/firestore/category";
export default function ProductPage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(selectedProduct.id);

      const filtered = products.filter(
        (item) => item.id !== selectedProduct.id,
      );

      setProducts(filtered);

      setShowDeleteModal(false);

      setSelectedProduct(null);

      toast.success("Product deleted Successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
      console.log(err);

      toast.error(err.message);
    }
  };
  const handleEditProduct = async () => {
    try {
      // Upload image first
      setLoading(true);
      const imageUrl = await uploadImage(formData.image);

      // Save product in Firestore
      let resp = await updateProduct(selectedProduct?.id, {
        name: formData?.name,
        price: formData?.price,
        category: formData?.category,
        description: formData?.description,
        image: imageUrl,
      });

      setLoading(false);
      toast.success("Product Added");

      setProducts((prod) =>
        prod.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                name: formData.name,
                price: formData.price,
                category: formData.category,
                description: formData.description,
                image: imageUrl,
              }
            : item,
        ),
      );
      setShowEditModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleAddProduct = async () => {
    try {
      // Upload image first
      setLoading(true);
      const imageUrl = await uploadImage(formData.image);

      // Save product in Firestore
      let resp = await addProduct({
        name: formData.name,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        image: imageUrl,
      });

      toast.success("Product Added");

      setProducts((prod) => [
        ...prod,
        {
          id: resp.id,
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and organize your store products
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:opacity-90 transition-all shadow-lg text-sm sm:text-base"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">Add your first product.</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ProductSkelton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-[220px] sm:h-[250px] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                      {product.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {product.category}
                    </p>
                  </div>

                  <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium shrink-0">
                    ${product.price}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      setFormData(product);
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                    className="flex-1 h-11 rounded-2xl bg-black text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                    className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-all shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Product Name
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
                  Price
                </label>

                <input
                  type="number"
                  placeholder="Enter product price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-gray-200 text-gray-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full mt-2 border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
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

            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full mt-2 border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleAddProduct}
                className="w-full py-3 rounded-2xl bg-black text-white hover:opacity-90 transition-all"
              >
                {loading ? "Adding" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Product Name
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
                  Price
                </label>

                <input
                  type="number"
                  placeholder="Enter product price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-gray-200 text-gray-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full mt-2 border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
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

            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full mt-2 border text-gray-600 border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleEditProduct}
                className="w-full py-3 rounded-2xl bg-black text-white hover:opacity-90 transition-all"
              >
                {loading ? "Editing" : "Edit Product"}
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
              Are you sure you want to delete this product?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                disabled={loading}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProduct(null);
                }}
                className={`
  flex-1 py-3 rounded-2xl transition-all duration-200
  ${
    loading
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
  }
`}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                {loading ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
