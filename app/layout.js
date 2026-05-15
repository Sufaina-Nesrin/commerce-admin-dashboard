import "./globals.css";
import Script from "next/script";

import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: "Admin Dashboard",
  description: "Ecommerce Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body className="min-h-screen w-full bg-red-100">{children}
         <Toaster
    position="top-right"
    reverseOrder={false}
  />
      </body>
      
      
    </html>
  );
}
