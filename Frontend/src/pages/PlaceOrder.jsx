import React, { useContext, useState } from 'react'
import Title from '../components/Title.jsx'
import Carttotal from '../components/Carttotal.jsx'
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { use } from 'react';

const PlaceOrder = () => {
  const [method, setmethod] = useState('cod');
  const { navigate, backendURL, token, cartitems, setcartitems, getcartamount, delivery_fee, products, clearcart } = useContext(ShopContext);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const onchangehandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setformdata(data => ({ ...data, [name]: value }))
  }

  const initpay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    handler: async (response) => {
      console.log("Payment success:", response)
      try {
        const { data } = await axios.post(backendURL + '/api/order/varifyrazorpay', response, { headers: { token } })
        if (data.success) {
          toast.success("Payment successful!")
          await clearcart()
          navigate('/order')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Payment verification failed")
      }
    },
    modal: {
      ondismiss: async function () {
        console.log("Payment dismissed - deleting order")
        // Call backend to delete order
        try {
          await axios.post(backendURL + '/api/order/varifyrazorpay', {
            razorpay_order_id: order.id
            // No razorpay_payment_id means cancelled
          }, { headers: { token } })
          toast.error("Payment cancelled")
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      let orderitems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          const iteminfo = structuredClone(products.find(product => product._id === items))
          if (iteminfo) {
            iteminfo.size = item
            iteminfo.quantity = cartitems[items][item]
            orderitems.push(iteminfo)
          }
        }
      }
      let orderdata = {
        // userid: userId,
        address: formdata,
        items: orderitems,
        amount: getcartamount() + delivery_fee,
        // paymentmethod:method
      }

      switch (method) {
        case 'cod':
          console.log(orderdata)
          const response = await axios.post(backendURL + '/api/order/place', orderdata, { headers: { token } })
          console.log(response.data)
          if (response.data.success) {
            await clearcart();
            navigate('/order')
          }
          else {
            console.log(response.data.message)
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':
          const responserazorpay = await axios.post(backendURL + '/api/order/razorpay', orderdata, { headers: { token } })
          if (responserazorpay.data.success) {
            initpay(responserazorpay.data.order)
          }

        default:
          break;
      }

    }
    catch (error) {
      console.log(error)
    }
  }



  return (
    <form onSubmit={onsubmithandler} className='w-[90vw] md:w-[80vw] my-10 mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-0'>
      <div className='w-full lg:w-auto'>
        <div className='flex justify-start'>
          <Title title1={'DELEVERY'} title2={'INFORMATION'} />
        </div>
        <div className="w-full max-w-xl py-8 bg-white rounded-xl">
          {/* Field Group 1: First Name / Last Name (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='firstname' value={formdata.firstname} type="text" placeholder="First name" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='lastname' value={formdata.lastname} type="text" placeholder="Last name" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 2: Email Address (Full Width) */}
          <div className="mb-4">
            <input onChange={onchangehandler} name='email' value={formdata.email} type="email" placeholder="Email address" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 3: Street (Full Width) */}
          <div className="mb-4">
            <input onChange={onchangehandler} name='street' value={formdata.street} type="text" placeholder="Street" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 4: City / State (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='city' value={formdata.city} type="text" placeholder="City" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='state' value={formdata.state} type="text" placeholder="State" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 5: Zipcode / Country (Two Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input onChange={onchangehandler} name='zipcode' value={formdata.zipcode} type="text" placeholder="Zipcode" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            <input onChange={onchangehandler} name='country' value={formdata.country} type="text" placeholder="Country" required
              className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

          {/* Field Group 6: Phone (Full Width) */}
          <div className="mb-6">
            <input onChange={onchangehandler} name='phone' value={formdata.phone} type="tel" placeholder="Phone" required
              className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          </div>

        </div>
      </div>
      <div className='w-full lg:w-auto mt-8 lg:mt-0'>
        <div><Carttotal /></div>
        <div className='flex flex-col sm:flex-row justify-between gap-3 my-5'>
          <button type='button' onClick={() => setmethod('razorpay')} className={`w-full sm:w-[50%] p-2 border border-gray-300 active:bg-gray-200 ${method === 'razorpay' ? 'border-orange-600' : ''}`}><img className='h-7 mx-auto sm:mx-0' src="icons/Razorpay.png" alt="" /></button>
          <button type='button' onClick={() => setmethod('cod')} className={`w-full sm:w-[50%] p-2 border border-gray-300 active:bg-gray-200 ${method === 'cod' ? 'border-orange-600' : ''}`}>CASH ON DELIVERY</button>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='bg-black text-white text-sm font-medium px-6 py-3 my-4 active:bg-gray-600 w-full sm:w-auto'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
