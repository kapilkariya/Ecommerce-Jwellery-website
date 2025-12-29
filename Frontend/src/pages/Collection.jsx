import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Searchbar from '../components/Searchbar';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [visible, setvisible] = useState(false);
  const [filterproducts, setfilterproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [sorttype, setsorttype] = useState("relavent");
  const { searchTerm, setSearchTerm, showsearch, setshowsearch } = useContext(ShopContext);

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setcategory(prev => [...prev, e.target.value])
    }
  }
  const togglesubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setsubcategory(prev => [...prev, e.target.value])
    }
  }

  const applyfilters = () => {
    let copyproduct = products.slice();

    if(searchTerm && showsearch ){
      copyproduct=copyproduct.filter(item=> item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (category.length > 0) {
      copyproduct = copyproduct.filter(item => category.includes(item.category));
    }
    if (subcategory.length > 0) {
      copyproduct = copyproduct.filter(item => subcategory.includes(item.subcategory));
    }
    setfilterproducts(copyproduct);
  }

  const sortproduct = () => {
  setfilterproducts(prev => {
    let copyproduct = [...prev];
    if (sorttype === "low-high") {
      copyproduct.sort((a, b) => a.price - b.price);
    } else if (sorttype === "high-low") {
      copyproduct.sort((a, b) => b.price - a.price);
    }
    return copyproduct;
  });
};



  useEffect(() => {
    setfilterproducts(products);
  }, [products])

  useEffect(() => {
    applyfilters()
  }, [category, subcategory,searchTerm,products])

  useEffect(() => {
    sortproduct()
  }, [sorttype,category,subcategory])


  return (
    <> 
    <div className='flex flex-col sm:flex-row w-[90vw] sm:w-[80vw] my-10 mx-auto gap-10'>

      {/* left part  */}
      <div className=' min-w-40 lg:w-[15vw] sm:mb-50 ' >
        <p className='flex text-xl font-medium mb-3 justify-center sm:justify-start'>FILTERS
          <img onClick={() => setvisible(!visible)} className={`h-8 block sm:hidden ${visible ? 'hidden' : ''}`} src="icons/dropdown.svg" alt="" />
          <img onClick={() => setvisible(!visible)} className={`h-8 block sm:hidden ${visible ? '' : 'hidden'}`} src="icons/dropup.svg" alt="" />
        </p>
        <div className={`border border-gray-300 p-4 my-4 sm:block ${visible ? '' : 'hidden'}`}>
          <p className='text-base font-bold pb-1'>CATEGORIES</p>
          <p className='py-1 text-base text-gray-700'>
            <input onClick={togglecategory} type="checkbox" value={'Rings'} /> Rings
          </p>
          <p className='py-1 text-base text-gray-700'>
            <input onClick={togglecategory} type="checkbox" value={'Necklace'} /> Necklace
          </p>
          <p className='py-1 text-base text-gray-700'>
            <input onClick={togglecategory} type="checkbox" value={'Bangles'} /> Bangles
          </p>
        </div>
        <div className={`border border-gray-300 p-4 my-4 sm:block ${visible ? '' : 'hidden'}`}>
          <p className='text-base font-bold pb-1'>TYPE</p>
          <p className='py-1 text-base text-gray-700'>
            <input type="checkbox" value={'Type1'} onClick={togglesubcategory} /> Type1
          </p>
          <p className='py-1 text-base text-gray-700'>
            <input type="checkbox" value={'Type2'} onClick={togglesubcategory} /> Type2
          </p>
          <p className='py-1 text-base text-gray-700'>
            <input type="checkbox" value={'Type3'} onClick={togglesubcategory} /> Type3
          </p>
        </div>
      </div>

      {/* right part */}

      <div className='w-full'>
        <div className='flex flex-col lg:flex-row justify-between mb-5 gap-3'>
          <Title title1={'ALL'} title2={'COLLECTIONS'} />
          <select onClick={(e) => { setsorttype(e.target.value) }} className='border border-gray-400 p-2 text-sm' name="" id="">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>

        {/* mapping products  */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 '>
          {
            filterproducts.map((item, index) => {
              return <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images[0]} />
            })
          }
        </div>
      </div>

    </div>
    </>
  )
}

export default Collection
