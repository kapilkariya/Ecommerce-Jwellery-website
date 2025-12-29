import React from 'react'
import Title from '../components/Title.jsx'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const About = () => {
  return (
    <div>
      <div className='my-10 w-[95vw] sm:w-[70vw] md:w-[100vw] m-auto'>
        <Title title1={'ABOUT'} title2={'US'} />
        <div className="w-full max-w-6xl mx-auto p-8 bg-white flex flex-col md:flex-row items-start gap-10">
          <div className="md:w-2/5 w-full flex-shrink-0">
            <img src="https://www.jewelsmart.in/media/catalog/product/cache/5e5d5507ad17a23dc9f1bc728eeab23c/s/q/square-red-stones-gold-plated-bangles-premium-design-8255.jpg" alt="Clothing and accessories arranged on a white background" className="m-auto w-80 md:w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className=" my-auto lg:w-3/5 w-full text-gray-600 font-sans leading-relaxed">
            <p className="mb-4 text-sm lg:text-base">Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p className="mb-6 text-sm lg:text-base">Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <h3 className=" text-lg lg:text-xl font-bold  mt-6 mb-3">Our Mission</h3>
            <p className=" text-sm lg:text-base">Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
        <div className="w-full max-w-6xl mb-10 mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Quality Assurance:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="p-4 border-l border-gray-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Convenience:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="p-4 border-l border-gray-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3">Exceptional Customer Service:</h3>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
        <NewsLetterBox/>
      </div>
    </div>
  )
}

export default About
