  import React, { useContext, useState } from 'react'
  import Title from '../components/Title.jsx'
  import Carttotal from '../components/Carttotal.jsx'
  import { ShopContext } from '../context/ShopContext.jsx';
  import { toast } from 'react-toastify';
  import axios from 'axios';
import { use } from 'react';

  const PlaceOrder = () => {
    const [method,setmethod]=useState('cod');
    const {navigate,backendURL,token, cartitems,setcartitems,getcartamount,delivery_fee,products ,clearcart  }= useContext(ShopContext);
    const [formdata,setformdata]= useState({
      firstname:'',
      lastname:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:''
    })
    const onchangehandler=(e)=>{
      const name=e.target.name
      const value= e.target.value 

      setformdata(data=>({...data,[name]:value}))
    }

    const onsubmithandler=async (e) => {
      e.preventDefault();
      try{
        let orderitems=[];
        for(const items in cartitems){
          for(const item in cartitems[items]){
            const iteminfo=structuredClone(products.find(product=>product._id===items))
            if(iteminfo){
              iteminfo.size=item
              iteminfo.quantity=cartitems[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
        let orderdata={
          // userid: userId,
          address:formdata,
          items:orderitems,
          amount:getcartamount()+delivery_fee,
          // paymentmethod:method
        }

        switch(method){
          case 'cod':
            console.log(orderdata)
            const response= await axios.post(backendURL+'/api/order/place',orderdata,{headers:{token}})
            console.log(response.data)
            if(response.data.success){
              await clearcart();
              navigate('/order')
            }
            else{
              console.log(response.data.message)
              toast.error(response.data.message)
            }
            break;
          default:
            break;
        }

      }
      catch(error){
        console.log(error)
      }
    }

    return (
      <form className='w-[80vw] my-10 mx-auto flex justify-between'>
        <div>
          <div className=' flex justify-start'>
            <Title title1={'DELEVERY'} title2={'INFORMATION'} />
          </div>
          <div className="w-full max-w-xl py-8 bg-white rounded-xl">
            {/* Field Group 1: First Name / Last Name (Two Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input onChange={onchangehandler} name='firstname' value={formdata.firstname} type="text" placeholder="First name" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
              <input onChange={onchangehandler} name='lastname' value={formdata.lastname}  type="text" placeholder="Last name" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

            {/* Field Group 2: Email Address (Full Width) */}
            <div className="mb-4">
              <input onChange={onchangehandler} name='email' value={formdata.email}  type="email" placeholder="Email address" required
                className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

            {/* Field Group 3: Street (Full Width) */}
            <div className="mb-4">
              <input onChange={onchangehandler} name='street' value={formdata.street}  type="text" placeholder="Street" required
                className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

            {/* Field Group 4: City / State (Two Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input onChange={onchangehandler} name='city' value={formdata.city}  type="text" placeholder="City" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
              <input onChange={onchangehandler} name='state' value={formdata.state}  type="text" placeholder="State" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

            {/* Field Group 5: Zipcode / Country (Two Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input onChange={onchangehandler} name='zipcode' value={formdata.zipcode}  type="text" placeholder="Zipcode" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
              <input onChange={onchangehandler} name='country' value={formdata.country}  type="text" placeholder="Country" required
                className="p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

            {/* Field Group 6: Phone (Full Width) */}
            <div className="mb-6">
              <input onChange={onchangehandler} name='phone' value={formdata.phone}  type="tel" placeholder="Phone" required
                className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
            </div>

          </div>
        </div>
        <div className=''>
          <div><Carttotal/></div>
            <div className='flex justify-between my-5'>
              <button onClick={()=>setmethod('stripe')} className={`w-[30%] p-2 border border-gray-300 active:bg-gray-200 ${method==='stripe' ? 'border-orange-600' : ''}`}><img className='h-10' src="icons/stripe.png" alt="" /></button>
              <button onClick={()=>setmethod('razorpay')} className={`w-[30%] p-2 border border-gray-300 active:bg-gray-200 ${method==='razorpay' ? 'border-orange-600' : ''}`}><img className='h-7' src="icons/Razorpay.png" alt="" /></button>
              <button onClick={()=>setmethod('cash on delivery')} className={`w-[30%] p-2 border border-gray-300 active:bg-gray-200 ${method==='cash on delivery' ? 'border-orange-600' : ''}`}>CASH ON DELIVERY</button>
            </div>
            <div className='flex justify-end'>
            <button onClick={onsubmithandler} type='submit' className='bg-black text-white text-sm font-medium px-6 py-3 my-4 active:bg-gray-600'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </form>
    )
  }

  export default PlaceOrder
