import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {

 
  const [list, setlist] = useState([]);
  const [quantity, setquantity] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  })
  const [update, setupdate] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchlist = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }
  
  const removeprod = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    
    try {
      const response = await axios.post(`${backendURL}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchlist();
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Failed to remove product');
    }
  }

  const updateprod = async (id) => {
    try {
      setupdate(-1)
      const response = await axios.post(`${backendURL}/api/product/update`, { id, quantity }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchlist();
      }
      else {
        toast.error(response.data.message)
      }
      setquantity({ S: 0, M: 0, L: 0, XL: 0 })
    } catch (error) {
      console.log(error)
      toast.error('Failed to update product');
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">ALL PRODUCT LIST</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory and quantities</p>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="col-span-2">
              <b className="text-gray-700">IMAGE</b>
            </div>
            <div className="col-span-3">
              <b className="text-gray-700">NAME</b>
            </div>
            <div className="col-span-2">
              <b className="text-gray-700">CATEGORY</b>
            </div>
            <div className="col-span-1">
              <b className="text-gray-700">PRICE</b>
            </div>
            <div className="text-center col-span-2">
              <b className="text-gray-700 text-center">ACTION</b>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-5 gap-2">
                <b className="text-gray-700 text-center">S</b>
                <b className="text-gray-700 text-center">M</b>
                <b className="text-gray-700 text-center">L</b>
                <b className="text-gray-700 text-center">XL</b>
                <b className="text-gray-700"></b>
              </div>
            </div>
          </div>

          {/* Mobile Table Header */}
          <div className="lg:hidden bg-gray-50 px-4 py-3 border-b border-gray-200">
            <b className="text-gray-700">PRODUCTS ({list.length})</b>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            /* Product List */
            <div className="divide-y divide-gray-100">
              {list.map((item, index) => (
                <div key={item._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                  {/* Desktop View */}
                  <div className="hidden lg:grid grid-cols-12 items-center px-6 py-4">
                    {/* Image */}
                    <div className="col-span-2">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img 
                          className="w-full h-full object-cover" 
                          src={item.images?.[0] || 'uploadarea.png'} 
                          alt={item.name} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'uploadarea.png';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Name */}
                    <div className="col-span-3">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                    </div>
                    
                    {/* Category */}
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-1">
                      <p className="font-semibold text-gray-900">{currency}{item.price}</p>
                    </div>
                    
                    {/* Remove Action */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => removeprod(item._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                        title="Remove product"
                      >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quantity Section */}
                    <div className="col-span-2">
                      {update === index ? (
                        /* Edit Mode */
                        <div className="grid grid-cols-5 gap-2">
                          {['S', 'M', 'L', 'XL'].map((size) => (
                            <input
                              key={size}
                              className="w-full px-2 py-1.5 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              type="number"
                              min="0"
                              value={quantity[size]}
                              onChange={(e) => {
                                const value = Math.max(0, parseInt(e.target.value) || 0);
                                setquantity(prev => ({ ...prev, [size]: value }))
                              }}
                            />
                          ))}
                          <button
                            onClick={() => updateprod(item._id)}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-150"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        /* View Mode */
                        <div className="grid grid-cols-5 gap-2">
                          {['S', 'M', 'L', 'XL'].map((size) => (
                            <div key={size} className="text-center">
                              <span className="inline-block w-10 py-1.5 bg-gray-100 rounded-lg text-gray-700 font-medium">
                                {item.quant[size] || 0}
                              </span>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              setupdate(index)
                              setquantity({
                                S: Number(item.quant.S) || 0,
                                M: Number(item.quant.M) || 0,
                                L: Number(item.quant.L) || 0,
                                XL: Number(item.quant.XL) || 0,
                              })
                            }}
                            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                          >
                            <img src="/edit.svg" className='' alt="" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="lg:hidden p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img 
                            className="w-full h-full object-cover" 
                            src={item.images?.[0] || 'uploadarea.png'} 
                            alt={item.name}
                          />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {item.category}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {currency}{item.price}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeprod(item._id)}
                            className="p-1 hover:bg-red-50 rounded"
                          >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Mobile Quantity Section */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {update === index ? (
                            /* Edit Mode - Mobile */
                            <div>
                              <div className="grid grid-cols-4 gap-2 mb-3">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                  <div key={size} className="text-center">
                                    <label className="block text-xs text-gray-500 mb-1">{size}</label>
                                    <input
                                      className="w-full px-2 py-1.5 text-center border border-gray-300 rounded-lg"
                                      type="number"
                                      min="0"
                                      value={quantity[size]}
                                      onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0);
                                        setquantity(prev => ({ ...prev, [size]: value }))
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setupdate(-1)}
                                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => updateprod(item._id)}
                                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* View Mode - Mobile */
                            <div>
                              <div className="grid grid-cols-4 gap-2 mb-3">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                  <div key={size} className="text-center">
                                    <label className="block text-xs text-gray-500 mb-1">{size}</label>
                                    <span className="inline-block w-full py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                                      {item.quant[size] || 0}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={() => {
                                  setupdate(index)
                                  setquantity({
                                    S: Number(item.quant.S) || 0,
                                    M: Number(item.quant.M) || 0,
                                    L: Number(item.quant.L) || 0,
                                    XL: Number(item.quant.XL) || 0,
                                  })
                                }}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                Edit Quantities
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Total Products: <span className="font-medium">{list.length}</span></p>
        </div>
      </div>
    </div>
  )
}

export default List