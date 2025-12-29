import React, { useState } from 'react';
import { backendURL } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ settoken }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + '/api/user/admin', { email, password })
      if (response.data.success) {
        settoken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200" style={{ background: 'linear-gradient(to right bottom, #e0e0e0, #f8f8f8)' }}>
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h1>
        <form onSubmit={onsubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input onChange={(e) => setemail(e.target.value)} value={email} id="email" type="email" required placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input onChange={(e) => setpassword(e.target.value)} value={password} id="password" type="password" required placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none" />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-150">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
