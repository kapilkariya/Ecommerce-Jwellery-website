import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx'
import Carttotal from '../components/Carttotal.jsx';

const Cart = () => {
  const { cartitems, currency, products,updatequantity, navigate, navtoplaceorder } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              qualtity: cartitems[items][item]
            })
          }
        }
      }
      setcartdata(tempdata);
    }
  }, [cartitems, products])


  return (cartdata.length > 0 ?
    (<div className='w-[80vw] mx-auto my-8'>
      <div className='flex justify-start mb-0'>
        <Title title1={'YOUR'} title2={'CART'} />
      </div>
      <div className='mb-30'>
        {
          cartdata.map((item, index) => {
            const productdata = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='bg-[#F5F5F5] p-5 my-5 flex justify-between sm:justify-start'>
                <div className='sm:w-[20%]'>
                  <img className='h-30 sm:h-35 mr-3' src={productdata.images[0]} alt="" />
                </div>

                <div className=' ml-8 sm:ml-5 sm:grid sm:grid-cols-3 w-[80%] mx-auto'>
                  <div className='sm:col-span-1 mb-10 sm:mb-0'>
                    <div className='text-base sm:text-xl font-medium my-2'>{productdata.name}</div>
                    <div className='flex gap-3 text-xs font-medium'>
                      <div>{`${currency}${productdata.price}`}</div>
                      <div>{`Size: ${item.size}`}</div>
                    </div>
                  </div>
                  <div className='col-span-2 grid grid-cols-2 '>
                    <div className='sm:m-auto flex' >
                      <div onClick={()=>updatequantity(item._id, item.size,item.qualtity-1)} className='bg-red-500 h-7 w-7 flex justify-center  cursor-pointer items-center rounded-full'>-</div>
                      <input onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updatequantity(item._id, item.size, Number(e.target.value))} className=' mx-3 border border-gray-200 w-10 text-center' type="number" min={1} value={item.qualtity} name="" id="" />
                      <div onClick={()=>updatequantity(item._id, item.size,item.qualtity+1)} className='bg-red-500 h-7 w-7 flex justify-center  cursor-pointer items-center rounded-full'>+</div>
                    </div>
                    <div className='sm:m-auto'>
                      <img onClick={() => updatequantity(item._id, item.size, 0)} className='h-5 sm:h-7' src="/icons/bin.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex flex-col items-end'>
        <Carttotal />
        <div className='flex justify-end'>
          <button onClick={() => navtoplaceorder() ? navigate('/placeorder') : ''} className='bg-black text-white text-sm font-medium px-6 py-3 my-4 active:bg-gray-600'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>)
    : (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
        <p className="text-gray-400 mt-2">Add items to get started</p>
      </div>
    )
  )
}

export default Cart
