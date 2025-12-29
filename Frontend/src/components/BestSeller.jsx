import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const bestseller = () => {

    const { products } = useContext(ShopContext)
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        const bestprod = products.filter(item=>item.bestseller)
        setbestseller(bestprod.slice(0, 5))
    }, [products])      


    return (
        <div>
            <div className='m-8  text-center'>
                <Title title1="BEST" title2="SELLERS" />
                <p className='my-3 text-xs sm:text-sm mx-auto text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, tempora maiores ut deserunt praesentium sapiente iusto quisquam numquam dolor libero!</p>

            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-10 gap-4 w-[90vw] m-auto'>
                {bestseller.map((item, index) => {
                    return <ProductItem key={index} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
                })}
            </div>
            
        </div>
    )
}

export default bestseller
