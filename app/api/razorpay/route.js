import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST() {
  try {
    const options = {
      amount: 50000,
      currency: 'INR',
      receipt: 'receipt_order_1',
    }
    console.log("hijijijijijiji")
    console.log("razorpay --",razorpay)
   const order = "hi"

    // const order = await razorpay.orders.create(options)

    return NextResponse.json(order)
  } catch (error) {
    console.log("error--", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}