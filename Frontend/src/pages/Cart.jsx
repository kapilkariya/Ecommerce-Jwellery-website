import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx'
import Carttotal from '../components/Carttotal.jsx';

const Cart = () => {
  const { cartitems, currency, products, updatequantity, navigate, navtoplaceorder } = useContext(ShopContext);
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
      <div className='mb-8'>
        {
          cartdata.map((item, index) => {
            const productdata = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='bg-white p-5 my-5 flex justify-between sm:justify-start border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className='sm:w-[20%]'>
                  <img className='h-30 sm:h-35 mr-3 rounded-lg object-cover' src={productdata.images[0]} alt="" />
                </div>

                <div className='ml-8 sm:ml-5 sm:grid sm:grid-cols-3 w-[80%] mx-auto'>
                  <div className='sm:col-span-1 mb-6 sm:mb-0'>
                    <div className='text-base sm:text-xl font-medium my-2 text-gray-800'>{productdata.name}</div>
                    <div className='flex gap-3 text-sm font-medium text-gray-600'>
                      <div className='text-amber-600 font-semibold'>{`${currency}${productdata.price}`}</div>
                      <div className='px-2 py-1 bg-gray-100 rounded text-xs'>{`Size: ${item.size}`}</div>
                    </div>
                  </div>
                  <div className='col-span-2 grid grid-cols-2 gap-4'>
                    <div className='sm:m-auto flex items-center gap-2'>
                      {/* Minus Button */}
                      <button
                        onClick={() => updatequantity(item._id, item.size, item.qualtity - 1)}
                        disabled={item.qualtity <= 1}
                        className={`h-8 w-8 flex justify-center items-center rounded-full border transition-all duration-200
                    ${item.qualtity <= 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:shadow-sm'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>

                      {/* Quantity Input */}
                      <input
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '0') return;
                          updatequantity(item._id, item.size, Number(value))
                        }}
                        className='mx-2 border border-gray-300 w-12 h-8 text-center rounded focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400'
                        type="number"
                        min={1}
                        value={item.qualtity}
                      />

                      {/* Plus Button */}
                      <button
                        onClick={() => updatequantity(item._id, item.size, item.qualtity + 1)}
                        className="h-8 w-8 flex justify-center items-center rounded-full border border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:shadow-sm transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    <div className='sm:m-auto flex justify-end'>
                      <button
                        onClick={() => updatequantity(item._id, item.size, 0)}
                        className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
