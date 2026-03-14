import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import Slidingbtn from '../components/Slidingbtn';
import { toast } from 'react-toastify';

// Star rating selector component
const StarSelector = ({ value, onChange }) => (
  <div className="flex gap-1 my-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="text-2xl focus:outline-none transition-transform hover:scale-110"
        aria-label={`${star} star`}
      >
        <span style={{ color: star <= value ? '#f59e0b' : '#d1d5db' }}>★</span>
      </button>
    ))}
  </div>
);

const Order = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);
  const [view, setview] = useState('pending');

  // Track which items have feedback panel open: key = `orderId_productId`
  const [openFeedback, setOpenFeedback] = useState({});
  // Track already-submitted feedback: key = `orderId_productId`
  const [submittedFeedback, setSubmittedFeedback] = useState({});
  // Form state per key
  const [feedbackForm, setFeedbackForm] = useState({});
  // Submitting spinner
  const [submitting, setSubmitting] = useState({});

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
            orderId: order._id,      // ← capture order ID
            status: order.status,
            payment: order.payment,
            paymentmethod: order.paymentmethod,
            date: order.date
          });
        });
      });

      const reversed = orderitem.reverse();
      setorderdata(reversed);

      // Pre-check submitted feedback for delivered items
      const deliveredItems = reversed.filter(i => i.status === 'Delivered');
      const checks = await Promise.all(
        deliveredItems.map(item =>
          axios.post(
            backendURL + '/api/feedback/check',
            { orderId: item.orderId, productId: item._id },
            { headers: { token } }
          ).then(r => ({ key: `${item.orderId}_${item._id}`, submitted: r.data.submitted }))
            .catch(() => ({ key: `${item.orderId}_${item._id}`, submitted: false }))
        )
      );
      const submittedMap = {};
      checks.forEach(c => { submittedMap[c.key] = c.submitted; });
      setSubmittedFeedback(submittedMap);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadorderdata();
  }, [token]);

  const toggleFeedbackPanel = (key) => {
    setOpenFeedback(prev => ({ ...prev, [key]: !prev[key] }));
    // Init form if not exists
    setFeedbackForm(prev => prev[key] ? prev : { ...prev, [key]: { rating: 0, comment: '' } });
  };

  const handleSubmitFeedback = async (item) => {
    const key = `${item.orderId}_${item._id}`;
    const form = feedbackForm[key] || { rating: 0, comment: '' };

    if (!form.rating || form.rating < 1) {
      toast.error('Please select a star rating');
      return;
    }

    setSubmitting(prev => ({ ...prev, [key]: true }));
    try {
      const response = await axios.post(
        backendURL + '/api/feedback/submit',
        {
          orderId: item.orderId,
          productId: item._id,
          productName: item.name,
          rating: form.rating,
          comment: form.comment,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Feedback submitted! Thank you.');
        setSubmittedFeedback(prev => ({ ...prev, [key]: true }));
        setOpenFeedback(prev => ({ ...prev, [key]: false }));
      } else {
        toast.error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className='w-[80vw] m-auto'>
      <div className='flex justify-start mx-2 mt-10'>
        <Title title1={'MY'} title2={'ORDERS'} />
      </div>
      <div className='mt-10'><Slidingbtn view={view} setview={setview} /></div>
      <div>
        {orderdata.map((item, index) =>
          ((item.status === 'Delivered' && view === 'delivered') ||
            (view === 'pending' && item.status !== 'Delivered' && item.status !== 'Cancelled') ||
            (view === 'all') ||
            (view === 'cancelled' && item.status === 'Cancelled')) && (
            <div key={index} className="my-5 sm:my-10 flex flex-col sm:flex-row items-start p-4 border-b border-gray-100 bg-white shadow-sm">
              <img
                src={item.images?.[0] || ""}
                alt="Product Image"
                className="w-full sm:w-30 h-auto sm:h-30 object-cover rounded-md mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
              />
              <div className="flex-grow flex flex-col justify-center w-full sm:w-auto">
                <p className="text-base font-semibold text-gray-900 mb-1">{item.name || "Product Name"}</p>
                <p className="text-sm text-gray-600 mb-1 flex flex-wrap gap-1 sm:gap-0">
                  <span className="font-bold text-gray-800 mr-2">{currency}{item.price || 0}</span>
                  <span className="mr-2">Quantity: {item.quantity || 1}</span>
                  <span>Size: {item.size || "N/A"}</span>
                </p>
                <p className="text-sm text-gray-400">Date: {new Date(item.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400">Payment: {item.paymentmethod}</p>

                {/* Feedback Section – Delivered only */}
                {item.status === 'Delivered' && (() => {
                  const key = `${item.orderId}_${item._id}`;
                  const alreadySubmitted = submittedFeedback[key];
                  const isOpen = openFeedback[key];
                  const form = feedbackForm[key] || { rating: 0, comment: '' };

                  return (
                    <div className="mt-3">
                      {alreadySubmitted ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium bg-green-50 border border-green-200 rounded-full px-3 py-1">
                          <span>✓</span> Feedback Submitted
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleFeedbackPanel(key)}
                            className="text-sm border border-amber-400 text-amber-600 hover:bg-amber-50 font-medium px-3 py-1 rounded-full transition duration-150"
                          >
                            {isOpen ? 'Cancel' : '★ Give Feedback'}
                          </button>

                          {isOpen && (
                            <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-md">
                              <p className="text-sm font-semibold text-gray-700 mb-1">Rate this product:</p>
                              <StarSelector
                                value={form.rating}
                                onChange={(val) =>
                                  setFeedbackForm(prev => ({
                                    ...prev,
                                    [key]: { ...form, rating: val }
                                  }))
                                }
                              />
                              <textarea
                                placeholder="Write a comment (optional)..."
                                value={form.comment}
                                onChange={(e) =>
                                  setFeedbackForm(prev => ({
                                    ...prev,
                                    [key]: { ...form, comment: e.target.value }
                                  }))
                                }
                                rows={3}
                                className="mt-2 w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                              />
                              <button
                                onClick={() => handleSubmitFeedback(item)}
                                disabled={submitting[key]}
                                className="mt-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-150 disabled:opacity-50"
                              >
                                {submitting[key] ? 'Submitting...' : 'Submit Feedback'}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4">
                <div className="flex items-center text-green-600 text-xs font-medium whitespace-nowrap mr-4 sm:mr-3 sm:mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> {item.status}
                </div>
                <button
                  onClick={loadorderdata}
                  className="border border-gray-300 py-2 px-3 text-sm text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap transition duration-150"
                >
                  Track Order
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Order;
