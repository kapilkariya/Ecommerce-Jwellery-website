import React, { useState, useRef } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/ShopContext';
import { useContext } from 'react';

const Add = ({ token }) => {
  const { backendURL } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Rings");
  const [subCategory, setsubCategory] = useState("Antitarnish");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);
  const [quant, setquant] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  });

  const generatecontent = async () => {
    if (!name && !description) return toast.error('Please enter title or description');
    try {
      setLoading(true);
      const { data } = await axios.post(backendURL + '/api/product/generate', { prompt: name }, { headers: { token } });
      if (data.success) {
        setdescription(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);
      formdata.append("bestseller", bestseller);
      formdata.append("sizes", JSON.stringify(sizes));
      formdata.append("quant", JSON.stringify(quant));
      formdata.append("date", Date.now());

      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);

      const response = await axios.post(backendURL + "/api/product/add", formdata, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setname("");
        setdescription("");
        setprice("");
        setbestseller(false);
        setsizes([]);
        setquant({ S: 0, M: 0, L: 0, XL: 0 });
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onsubmithandler} className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Fill in the details below to add a new product to your store</p>
        </div>

        {/* Upload Images Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <p className="text-base font-medium text-gray-800 mb-4">Upload Images</p>
          <div className="flex flex-wrap gap-4">
            <label htmlFor="image1" className='cursor-pointer'>
              <div className='w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden'>
                {!image1 ? (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image1)} alt="" />
                )}
              </div>
              <input onChange={(e) => setimage1(e.target.files[0])} type="file" id="image1" hidden accept="image/*" />
            </label>
            <label htmlFor="image2" className='cursor-pointer'>
              <div className='w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden'>
                {!image2 ? (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image2)} alt="" />
                )}
              </div>
              <input onChange={(e) => setimage2(e.target.files[0])} type="file" id="image2" hidden accept="image/*" />
            </label>
            <label htmlFor="image3" className='cursor-pointer'>
              <div className='w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden'>
                {!image3 ? (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image3)} alt="" />
                )}
              </div>
              <input onChange={(e) => setimage3(e.target.files[0])} type="file" id="image3" hidden accept="image/*" />
            </label>
            <label htmlFor="image4" className='cursor-pointer'>
              <div className='w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden'>
                {!image4 ? (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image4)} alt="" />
                )}
              </div>
              <input onChange={(e) => setimage4(e.target.files[0])} type="file" id="image4" hidden accept="image/*" />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-4">Upload up to 4 images (JPG, PNG, WEBP)</p>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>
          
          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                id="productName"
                type="text"
                placeholder="Type here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Product description <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                id="productDescription"
                placeholder="Write content here"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition duration-150"
              ></textarea>
              <button
                type='button'
                disabled={loading}
                onClick={generatecontent}
                className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 text-sm"
              >
                {loading ? 'Generating...' : '✨ Generate with AI'}
              </button>
            </div>

            {/* Category, Subcategory, Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Product category
                </label>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  id="productCategory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer transition duration-150 bg-white"
                  value={category}
                >
                  <option value="Rings">Rings</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Mangalsutra">Mangalsutra</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Sets">Sets</option>
                </select>
              </div>

              <div>
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Sub category
                </label>
                <select
                  onChange={(e) => setsubCategory(e.target.value)}
                  id="subCategory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer transition duration-150 bg-white"
                  value={subCategory}
                >
                  <option value="Antitarnish">Anti-Tarnish</option>
                  <option value="Americand">American Diamond</option>
                  <option value="Rajwadi">Rajwadi</option>
                </select>
              </div>

              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  id="productPrice"
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Sizes Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Product Sizes & Quantities</p>
          <div className="flex flex-wrap gap-8">
            {/* Size S */}
            <div className="text-center">
              <div
                onClick={() => setsizes((prev) => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}
                className={`${sizes.includes("S") ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 font-medium`}
              >
                S
              </div>
              <input
                value={quant.S}
                onChange={(e) => setquant(prev => ({ ...prev, S: Number(e.target.value) }))}
                className={`${sizes.includes("S") ? 'block' : 'hidden'} w-16 h-10 border border-gray-300 rounded-lg text-center mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                type="number"
                min="0"
                placeholder="Qty"
              />
            </div>

            {/* Size M */}
            <div className="text-center">
              <div
                onClick={() => setsizes((prev) => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}
                className={`${sizes.includes("M") ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 font-medium`}
              >
                M
              </div>
              <input
                value={quant.M}
                onChange={(e) => setquant(prev => ({ ...prev, M: Number(e.target.value) }))}
                className={`${sizes.includes("M") ? 'block' : 'hidden'} w-16 h-10 border border-gray-300 rounded-lg text-center mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                type="number"
                min="0"
                placeholder="Qty"
              />
            </div>

            {/* Size L */}
            <div className="text-center">
              <div
                onClick={() => setsizes((prev) => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}
                className={`${sizes.includes("L") ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 font-medium`}
              >
                L
              </div>
              <input
                value={quant.L}
                onChange={(e) => setquant(prev => ({ ...prev, L: Number(e.target.value) }))}
                className={`${sizes.includes("L") ? 'block' : 'hidden'} w-16 h-10 border border-gray-300 rounded-lg text-center mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                type="number"
                min="0"
                placeholder="Qty"
              />
            </div>

            {/* Size XL */}
            <div className="text-center">
              <div
                onClick={() => setsizes((prev) => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}
                className={`${sizes.includes("XL") ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 font-medium`}
              >
                XL
              </div>
              <input
                value={quant.XL}
                onChange={(e) => setquant(prev => ({ ...prev, XL: Number(e.target.value) }))}
                className={`${sizes.includes("XL") ? 'block' : 'hidden'} w-16 h-10 border border-gray-300 rounded-lg text-center mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                type="number"
                min="0"
                placeholder="Qty"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Click on a size to enable it, then enter the available quantity</p>
        </div>

        {/* Bestseller Checkbox */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <input
              onChange={() => setbestseller(prev => !prev)}
              checked={bestseller}
              type="checkbox"
              id='bestseller'
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 cursor-pointer">
              Add to bestseller
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-7">Bestseller products will be highlighted on the homepage</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type='submit'
            disabled={loading}
            className='px-10 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default Add;