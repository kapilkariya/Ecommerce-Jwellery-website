import React from 'react'
import Title from './Title.jsx'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproduct, setlatestproduct] = useState([])
  useEffect(() => {
    setlatestproduct(products.slice(0, 10));
  }, [products])


  return (
    <div>
      <div className='w-[80vw] m-auto text-center' >
        <Title title1={"LATEST"} title2={"COLLECTIONS"} />
        <p className=' text-xs my-3  sm:text-sm mx-auto text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, tempora maiores ut deserunt praesentium sapiente iusto quisquam numquam dolor libero!</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-10 gap-4 w-[90vw] m-auto'>
        {latestproduct.map((item, index) => {
          return <ProductItem key={index} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
        })}
      </div>

    </div>
  )
}

export default LatestCollection
