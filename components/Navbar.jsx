const handlePayment = async () => {

  try {

    const response = await fetch(
      '/api/razorpay',
      {
        method: 'POST',
      }
    )

    const order =
      await response.json()

    const options = {

      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: 'My Store',

      description:
        'Test Payment',

      order_id: order.id,

      handler: function () {

        alert(
          'Payment Successful'
        )

        router.push(
          '/success?payment=success'
        )
      },

      theme: {
        color: '#000000',
      },
    }

    // IMPORTANT FIX
    if (
      typeof window !==
      'undefined'
    ) {

      const razor =
        new window.Razorpay(
          options
        )

      razor.open()
    }

  } catch (error) {

    console.log(error)

    alert(
      'Payment failed'
    )
  }
}