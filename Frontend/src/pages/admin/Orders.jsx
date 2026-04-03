import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slidingbtn from '../../components/Slidingbtn';
import { ShopContext } from '../../context/ShopContext';
import { useContext } from 'react';

const Orders = ({ token }) => {
  const { backendURL, currency } = useContext(ShopContext);
  const [orders, setorders] = useState([]);
  const [view, setview] = useState('all');
  
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
  
  const statushandler = async (e, orderid) => {
    try {
      const response = await axios.post(backendURL + '/api/order/status', { orderid, status: e.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchallorders()
        toast.success(`Order status updated to ${e.target.value}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchallorders();
  }, [token])

  // Filter orders based on view
  const getFilteredOrders = () => {
    switch(view) {
      case 'all':
        return orders;
      case 'pending':
        return orders.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled');
      case 'delivered':
        return orders.filter(order => order.status === 'Delivered');
      case 'cancelled':
        return orders.filter(order => order.status === 'Cancelled');
      default:
        return orders;
    }
  }

  const filteredOrders = getFilteredOrders();

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Packing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>
          <Slidingbtn view={view} setview={setview} />
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">
                {view === 'all' && 'No orders have been placed yet.'}
                {view === 'pending' && 'No pending orders.'}
                {view === 'delivered' && 'No delivered orders.'}
                {view === 'cancelled' && 'No cancelled orders.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <div key={order._id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order._id?.slice(-8) || index + 1}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{currency}{order.amount}</p>
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
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                            {order.status === 'Order Placed' && '📦 Order Placed'}
                            {order.status === 'Packing' && '📦 Packing'}
                            {order.status === 'Shipped' && '🚚 Shipped'}
                            {order.status === 'Out for Delivery' && '🚚 Out for Delivery'}
                            {order.status === 'Delivered' && '✅ Delivered'}
                            {order.status === 'Cancelled' && '❌ Cancelled'}
                          </span>
                        </div>
                        
                        {/* Only show status dropdown for non-cancelled orders */}
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <select 
                            onChange={(e) => statushandler(e, order._id)} 
                            value={order.status} 
                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                          >
                            <option value="Order Placed">📦 Order Placed</option>
                            <option value="Packing">📦 Packing</option>
                            <option value="Shipped">🚚 Shipped</option>
                            <option value="Out for Delivery">🚚 Out for Delivery</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                        )}
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium text-gray-900">{order.paymentmethod || 'COD'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders