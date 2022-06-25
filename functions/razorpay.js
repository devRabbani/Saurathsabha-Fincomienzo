const Razorpay = require('razorpay')
require('dotenv').config()

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RZPAY_KEY,
  key_secret: process.env.REACT_APP_RZPAY_SECRET,
})

exports.handler = async function (event) {
  const { amount } = JSON.parse(event.body)
  const response = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  }
}
