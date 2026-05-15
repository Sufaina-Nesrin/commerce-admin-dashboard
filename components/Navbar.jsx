"use client";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
  const handlePayment = async () => {
    const response = await fetch("/api/razorpay", {
      method: "POST",
    });

    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "My Store",
      description: "Test Payment",
      order_id: order.id,

      handler: function (response) {
        alert("Payment Successful");

        router.push("/success?payment=success");
      },

      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shadow-sm">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* LOGO */}
        <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center shadow-md">
          <ShoppingBag size={22} className="text-white" />
        </div>

        {/* BRAND */}
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
            LocalCart Admin
          </h1>

          <p className="text-xs text-gray-500 -mt-1">
            Ecommerce Management Panel
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePayment}
          className="flex items-center gap-2 bg-black text-white px-4 sm:px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all shadow-lg text-sm sm:text-base"
        >
          <ShoppingCart size={18} />

          <span>Checkout</span>
        </button>
      </div>
    </header>
  );
}
