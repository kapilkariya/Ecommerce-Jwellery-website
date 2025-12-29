import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row h-auto sm:h-[500px] w-[80vw] my-10 mx-auto border border-gray-300 shadow-lg">

  <div className="flex w-full h-60 sm:w-1/2 sm:h-full items-center justify-center bg-gradient-to-r from-white to-gray-50 p-4">
    <div className="p-4 sm:p-10 max-w-xl text-center sm:text-left">

      <p className="flex items-center text-xs uppercase tracking-[2px] text-gray-600 mb-3 justify-center sm:justify-start">
        <span className="w-8 h-px bg-gray-500 mr-2"></span>
        OUR BESTSELLERS
      </p>

      <h2 className="text-4xl sm:text-7xl font-light prata-regular text-gray-900 mb-4 sm:mb-8 font-serif">
        Latest Arrivals
      </h2>

      <a href="/shop" className="flex items-center text-sm font-semibold uppercase tracking-[2px] text-gray-900 hover:text-gray-700 transition duration-300 justify-center sm:justify-start">
        SHOP NOW
        <span className="w-8 h-px bg-gray-900 ml-2"></span>
      </a>

    </div>
  </div>

  <div className="w-full h-70 sm:w-1/2 sm:h-full bg-[#f7e0df]">
    <img
      src="/icons/hero_img.png"
      alt="Elegant Model for Latest Arrivals"
      className="h-full w-full object-cover"
    />
  </div>

</div>
  )
}

export default Hero
