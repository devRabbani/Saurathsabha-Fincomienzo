require('dotenv').config()
const crypto = require('crypto')

exports.handler = async function (event) {
  const { order_id, payment_id, signature, amount } = JSON.parse(event.body)
  const secret = process.env.RZPAY_SECRET
  const order_payment = order_id + '|' + payment_id

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(order_payment.toString())
    .digest('hex')

  let result = {
    isPaid: false,
    order_id,
    payment_id,
    signature,
  }
  if (expectedSignature === signature) {
    result = {
      isPaid: true,
      order_id,
      payment_id,
      signature,
    }
  }
  console.log(result)
  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  }
}
