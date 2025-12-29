import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setlist] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      if (response.data.success) {
        setlist(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const removeprod= async (id)=>{
    try{
      const response = await axios.post(`${backendURL}/api/product/remove`, { id }, { headers: { token } });
      if(response.data.success){
        toast.success(response.data.message)
        await fetchlist();
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <>
      <p>ALL PRODUCT LIST</p>
      <div className='flex flex-col gap-3'>
        {/* list table title  */}
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr]'>
          <b>IMAGE</b>
          <b>NAME</b>
          <b>CATEGORY</b>
          <b>PRICE</b>
          <b>ACTION</b>
        </div>

        {/* product list  */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] w-full items-center gap-2' key={index}>
              <img className="w-16 h-16 object-cover" src={item.images?.[0] || 'uploadarea.png'} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='cursor-pointer' onClick={()=>removeprod(item._id)} >X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List
