import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // also include CSS


const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);
  const fetchallorders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        setorders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }
  const statushandler= async(e,orderid)=>{
    try{
      const response= await axios.post(backendURL+'/api/order/status',{orderid,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchallorders()
      }
    }
    catch(error){
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchallorders();
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>
    <div className="space-y-6">
      {orders.map((order, index) =>
        order.items.length > 0 && (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <img src="uploadarea.png" alt="Order" className="w-8 h-8 object-contain opacity-70"/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{index + 1}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{currency + order.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.payment ? 'Payment Done' : 'Payment Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">Size: <span className="font-medium">{item.size}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">×{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Total Items: <span className="font-semibold">{order.items.length}</span></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 text-sm">{order.address.firstname + " " + order.address.lastname}</p>
                      <p className="text-sm text-gray-600 mt-1">{order.address.street}</p>
                      <p className="text-sm text-gray-600">{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                      <p className="text-sm text-gray-600 mt-2">📞 {order.address.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Status</h4>
                    <select onChange={(e)=>statushandler(e,order._id)} value={order.status} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200">
                      <option value="Order Placed">📦 Order Placed</option>
                      <option value="Packing">📦 Packing</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Out for Delivery">📦 Out for Delivery</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-900">{order.paymentmethod}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      )}
    </div>
  </div>
</div>

  )
}

export default Orders
