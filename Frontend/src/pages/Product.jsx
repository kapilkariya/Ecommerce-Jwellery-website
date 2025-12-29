import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import Relatedproducts from '../components/Relatedproducts';

const Product = () => {
  const { productid } = useParams();
  const { products, currency, addtocart } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false)
  const [images, setimage] = useState('');
  const [size, setsize] = useState('');

  const fetchdata = async () => {
    products.map((item) => {
      if (item._id === productid) {
        setproductdata(item)
        setimage(item.images[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchdata();
  }, [productid,products])

  return productdata ? (
    <div className='w-[80vw] m-auto'>
      {/*  left part */}
      <div className='flex flex-col sm:flex-row  m-auto mt-6'>
        <div className='flex flex-col-reverse md:flex-row sm:w-1/2 gap-6 justify-center ' >
          <div className='flex md:flex-col gap-[10px] md:h-[75vh] overflow-auto '>
            {
              productdata.images.map((item, index) => {
                return <img onClick={() => setimage(item)} className='h-30 sm:h-40 md:h-[24vh]' src={item} key={index} alt="" />
              })
            }
          </div>
          <div className=' sm:h-[75vh] mb-10 md:mb-20'>
            <img className='h-full w-full object-contain' src={images} alt="" />
          </div>
        </div>

        {/* right part */}

        <div className='sm:w-1/2 p-6'>
          <div className='text-2xl font-medium'>{productdata.name}</div>
          <div className='flex items-center my-3 gap-[1px] '>
            <img className='h-4' src="/icons/yellowstar.png" alt="" />
            <img className='h-4' src="/icons/yellowstar.png" alt="" />
            <img className='h-4' src="/icons/yellowstar.png" alt="" />
            <img className='h-4' src="/icons/yellowstar.png" alt="" />
            <img className='h-4' src="/icons/dullstar.svg" alt="" />
            <p className=' mx-2 text-sm text-gray-700'> (112)</p>
          </div>
          <div className='py-5 text-3xl font-bold' >{`${currency} ${productdata.price}`}</div>
          <div className='text-gray-500 md:text-base' >{productdata.description}</div>
          <div className='my-8 font-medium'>
            <p className='font-medium my-5'>Select Size</p>
            <div >
              {
                productdata.sizes.map((item, index) => {
                  return <button onClick={() => setsize(item)} className={`border border-gray-100 bg-gray-100 mr-3 py-2 px-4 ${item === size ? 'border-orange-600' : ''} `} key={index}>{item}</button>
                })
              }
            </div>
          </div>
          <button onClick={() => addtocart(productdata._id, size)} className='text-white bg-black p-3 px-8 rounded-md  active:bg-gray-700' >ADD TO CART</button>
          <hr className='h-[1px] border border-gray-200 my-10' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review  */}
      <div className='mt-20 mb-10'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab nulla corporis temporibus quibusdam iure odit? Tenetur ducimus suscipit possimus perspiciatis vitae laudantium nihil expedita voluptatibus sapiente quo quod, sit iure, nobis voluptatem.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error molestiae dignissimos quae fugit, cum, optio blanditiis porro quas minima, sit magnam. Officiis beatae et at eaque veritatis dignissimos laborum fuga, quam temporibus voluptatem sit commodi hic optio accusantium eos aspernatur.</p>
        </div>
      </div>
      {/* display related products  */}
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Relatedproducts category={productdata.category} subcategory={productdata.subcategory} />
      </div>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
