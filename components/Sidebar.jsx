"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  ImageIcon,
  LayoutGrid,
  Package,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Banners",
      href: "/admin/banners",
      icon: ImageIcon,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: LayoutGrid,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden fixed top-20 left-4 z-[1000] bg-black text-white p-2.5 rounded-xl shadow-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed
    top-16
    left-0
    h-[calc(100vh-64px)]
    w-72
    bg-white
    border-r
    border-gray-200
    z-40
    transform
    transition-transform
    duration-300
    ease-in-out

    ${open ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
  `}
      >
        <div className="h-full flex flex-col">
          {/* HEADER */}
          <div className="px-6 py-8 border-b border-gray-100">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Admin Panel
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your ecommerce store
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }
                  `}
                >
                  <div
                    className={`
                      transition-transform duration-200
                      ${isActive ? "scale-110" : "group-hover:scale-105"}
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="font-medium text-[15px]">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gray-100 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-900">
                Ecommerce Admin
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Manage products, banners, and categories easily.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
