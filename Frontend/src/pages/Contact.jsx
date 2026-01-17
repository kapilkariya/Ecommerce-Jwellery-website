import React from 'react'
import NewsLetterBox from '../components/NewsLetterBox.jsx'
import { useEffect } from 'react';

const Contact = () => {
  useEffect(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
    },[])
  return (
    <div className='m-20 '>
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg m-20 ">

        <div className="md:w-1/2 w-full flex-shrink-0">
          <img src="https://images.pexels.com/photos/7974/pexels-photo.jpg?cs=srgb&dl=pexels-life-of-pix-7974.jpg&fm=jpg" alt="A modern workspace with a laptop, coffee, and plant" className="w-full h-full object-cover"></img>
        </div>

        <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center">

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Store</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p className="text-gray-700 text-sm mt-3">
              Tel: (415) 555-0132<br />
              Email: admin@forever.com
            </p>
          </div>

          
        </div>
      </div>
      <NewsLetterBox/>

    </div>
  )
}

export default Contact
