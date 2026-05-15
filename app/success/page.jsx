'use client'

import Link from 'next/link'

import {
  CheckCircle2,
  ArrowRight,
  Receipt,
  ShoppingBag,
} from 'lucide-react'

import {
  useSearchParams,
  useRouter,
} from 'next/navigation'

import {
  useEffect,
  Suspense,
} from 'react'


function PaymentSuccessContent() {

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {

    const payment =
      searchParams.get('payment')

    if (payment !== 'success') {

      router.push('/')

    }

  }, [searchParams, router])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">

      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-200">

        {/* TOP DECORATION */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600" />

        {/* CONTENT */}
        <div className="p-8 sm:p-12">

          {/* SUCCESS ICON */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />

              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-xl">

                <CheckCircle2
                  size={50}
                  className="text-white"
                />

              </div>

            </div>

          </div>


          {/* TEXT */}
          <div className="text-center mt-8">

            <p className="text-green-600 font-semibold tracking-widest uppercase text-sm">
              Payment Successful
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mt-4">
              Thank You!
            </h1>

            <p className="text-gray-500 text-lg mt-4 leading-relaxed">
              Your payment has been processed
              successfully. Your order is now
              confirmed and being prepared.
            </p>

          </div>


          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">

            {/* ORDER */}
            <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">

                  <ShoppingBag size={22} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>

                  <h2 className="font-semibold text-gray-900">
                    Confirmed
                  </h2>

                </div>

              </div>

            </div>


            {/* RECEIPT */}
            <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center">

                  <Receipt size={22} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Receipt
                  </p>

                  <h2 className="font-semibold text-gray-900">
                    Sent to Email
                  </h2>

                </div>

              </div>

            </div>

          </div>


          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              href="/"
              className="flex-1 h-14 rounded-2xl border border-gray-300 flex items-center justify-center font-medium text-gray-700 hover:bg-gray-100 transition-all"
            >
              Continue Shopping
            </Link>

            <Link
              href="/admin"
              className="flex-1 h-14 rounded-2xl bg-black text-white flex items-center justify-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg"
            >

              View Dashboard

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}


export default function PaymentSuccessPage() {

  return (

    <Suspense fallback={<div>Loading...</div>}>

      <PaymentSuccessContent />

    </Suspense>

  )

}