import { addShidhantRequest, changePlan } from './firebase'
import toast from 'react-hot-toast'

const priceList = {
  silver: 2100,
  gold: 3100,
  platinum: 11000,
  personalised: 51000,
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
  })
}

export const showRazorpay = async (plan, name, number, uid) => {
  const loadedscript = await loadRazorpay()
  if (!loadedscript) {
    alert('Error while loading the script , Please try again')
    return
  }
  const { response } = await fetch('/api/razorpay', {
    method: 'post',
    body: JSON.stringify({ amount: priceList[plan] }),
  }).then((res) => res.json())

  const { amount, id } = response
  console.log(response)

  const options = {
    key: process.env.REACT_APP_RZPAY_KEY,
    amount: amount * 100,
    currency: 'INR',
    name: plan.toUpperCase(),
    description: 'Thanks for choosing us',
    image: '/squarelogo.webp',
    order_id: id,
    handler: async function (res) {
      const { result } = await fetch('/api/verify', {
        method: 'post',
        body: JSON.stringify({
          payment_id: res.razorpay_payment_id,
          order_id: res.razorpay_order_id,
          signature: res.razorpay_signature,
        }),
      }).then((t) => t.json())
      await changePlan(uid, result, plan, amount)
      if (result?.isPaid) {
        toast.success('Payment Successfully Completed')
      } else {
        toast.error('Sorry Payment UnSuccessfull')
      }
    },
    prefill: {
      name,
      contact: number,
    },
    theme: {
      color: '#830305',
    },
  }

  const rzp1 = new window.Razorpay(options)
  rzp1.on('payment.failed', function (response) {
    alert(response.error.description)
    alert(response.error.step)
    alert(response.error.reason)
  })
  rzp1.open()
}

export const showRZPYShidhant = async (data, url1, url2, setIsSucces) => {
  const loadedscript = await loadRazorpay()
  if (!loadedscript) {
    alert('Error while loading the script , Please try again')
    return
  }
  const { response } = await fetch('/api/razorpay', {
    method: 'post',
    body: JSON.stringify({ amount: 1100 }),
  }).then((res) => res.json())

  const { amount, id } = response
  console.log(response)

  const options = {
    key: process.env.REACT_APP_RZPAY_KEY,
    amount: amount * 100,
    currency: 'INR',
    name: 'Online Shidhant Service',
    description: 'Thanks for choosing us',
    image: '/squarelogo.webp',
    order_id: id,
    handler: async function (res) {
      const { result } = await fetch('/api/verify', {
        method: 'post',
        body: JSON.stringify({
          payment_id: res.razorpay_payment_id,
          order_id: res.razorpay_order_id,
          signature: res.razorpay_signature,
        }),
      }).then((t) => t.json())
      await addShidhantRequest(data, url1, url2, result)
      // await changePlan(uid, result, plan, amount)
      if (result?.isPaid) {
        toast.success('Payment Successfully Completed')
        setIsSucces(true)
      } else {
        toast.error('Sorry Payment UnSuccessfull')
      }
      return result
    },
    prefill: {
      name: data.name,
      contact: data.number,
    },
    theme: {
      color: '#830305',
    },
  }

  const rzp1 = new window.Razorpay(options)
  rzp1.on('payment.failed', function (response) {
    alert(response.error.description)
    alert(response.error.step)
    alert(response.error.reason)
  })
  rzp1.open()
}
