import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Order = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);

  const loadorderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendURL + '/api/order/userorders',
        {}, 
        { headers: { token } }
      );

      if (!response.data.success) return;

      let orderitem = [];
      response.data.orders.forEach(order => {
        (order.items || []).forEach(item => {
          orderitem.push({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentmethod: order.paymentmethod,
            date: order.date
          });
        });
      });

      setorderdata(orderitem.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadorderdata();
  }, [token]);

  return (
    <div className='w-[80vw] m-auto'>
      <div className='flex justify-start mx-2 mt-10'>
        <Title title1={'MY'} title2={'ORDERS'} />
      </div>
      <div>
        {orderdata.map((item, index) => (
          <div key={index} className="my-10 flex items-start p-4 border-b border-gray-100 bg-white shadow-sm">
            <img src={item.images?.[0] || ""} alt="Product Image" className="w-30 h-30 object-cover rounded-md mr-4 flex-shrink-0" />
            <div className="flex-grow flex flex-col justify-center">
              <p className="text-base font-semibold text-gray-900 mb-1">{item.name || "Product Name"}</p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-bold text-gray-800 mr-2">{currency}{item.price || 0}</span>
                <span className="mr-2">Quantity: {item.quantity || 1}</span>
                <span>Size: {item.size || "N/A"}</span>
              </p>
              <p className="text-sm text-gray-400">Date: {new Date(item.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-400">Payment: {item.paymentmethod}</p>
            </div>
            <div className="flex flex-col items-end justify-between h-full ml-4">
              <div className="flex items-center text-green-600 text-xs font-medium whitespace-nowrap mb-4 mr-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> {item.status}
              </div>
              <button onClick={loadorderdata} className="border border-gray-300 py-2 px-3 text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap transition duration-150">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
