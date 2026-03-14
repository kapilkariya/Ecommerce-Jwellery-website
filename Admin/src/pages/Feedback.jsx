import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const StarDisplay = ({ rating }) => (
  <span className="text-amber-400 text-base tracking-tight">
    {[1, 2, 3, 4, 5].map(s => (
      <span key={s} style={{ color: s <= rating ? '#f59e0b' : '#d1d5db' }}>★</span>
    ))}
  </span>
);

const Feedback = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        backendURL + '/api/feedback/list',
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      } else {
        toast.error(res.data.message || 'Failed to load feedback');
      }
    } catch (err) {
      toast.error('Error loading feedback');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadFeedback();
  }, [token]);

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customer Feedback</h2>
          <p className="text-sm text-gray-500 mt-1">
            Feedback submitted by customers for delivered orders
          </p>
        </div>
        <span className="bg-amber-100 text-amber-700 font-semibold text-sm px-4 py-1.5 rounded-full">
          {feedbacks.length} Review{feedbacks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading feedback...
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <span className="text-5xl mb-4">💬</span>
          <p className="text-base font-medium">No feedback yet</p>
          <p className="text-sm mt-1">Customer reviews will appear here after delivery.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Comment</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {feedbacks.map((fb, i) => (
                <tr key={fb._id} className="hover:bg-amber-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-[160px] truncate">
                    {fb.productName || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{fb.userName || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {fb.orderId?.slice(0, 16)}…
                  </td>
                  <td className="px-4 py-3">
                    <StarDisplay rating={fb.rating} />
                    <span className="ml-1 text-xs text-gray-500">({fb.rating}/5)</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[220px]">
                    {fb.comment ? (
                      <span className="italic">"{fb.comment}"</span>
                    ) : (
                      <span className="text-gray-300">No comment</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(fb.date).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Feedback;
