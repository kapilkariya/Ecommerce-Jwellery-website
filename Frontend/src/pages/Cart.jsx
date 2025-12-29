import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx'
import Carttotal from '../components/Carttotal.jsx';

const Cart = () => {
  const { cartitems, currency, products, updatequantity,navigate,navtoplaceorder  } = useContext(ShopContext);
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    if(products.length>0){
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
  }, [cartitems,products])

  return (
    <div className='w-[80vw] mx-auto my-8'>
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

                <div className= ' ml-8 sm:ml-5 sm:grid sm:grid-cols-3 w-[80%] mx-auto'>
                  <div className='sm:col-span-1 mb-10 sm:mb-0'>
                    <div className='text-base sm:text-xl font-medium my-2'>{productdata.name}</div>
                    <div className='flex gap-3 text-xs font-medium'>
                      <div>{`${currency}${productdata.price}`}</div>
                      <div>{`Size: ${item.size}`}</div>
                    </div>
                  </div>
                  <div className='col-span-2 grid grid-cols-2 '>
                    <div className='sm:m-auto' >
                      <input onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updatequantity(item._id, item.size, Number(e.target.value))} className='border border-gray-200 w-10 text-center' type="number" min={1} defaultValue={item.qualtity} name="" id="" />
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
          <button onClick={()=>{navtoplaceorder()? navigate('/placeorder'): ''}} className='bg-black text-white text-sm font-medium px-6 py-3 my-4 active:bg-gray-600'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
