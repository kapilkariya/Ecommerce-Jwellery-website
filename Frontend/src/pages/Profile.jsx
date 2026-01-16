import React, { useContext, useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Shield, Home, Edit2, Plus, Trash2 } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { navigate, backendURL, token } = useContext(ShopContext);
  const [user, setuser] = useState()

  const delacc = async () => {
    try {
      if (confirm('Your data would be permently deleted')) {
        const res = await axios.post(backendURL + '/api/user/delusr',{}, { headers: { token } })
        console.log(token)
        if (res.data.success) {
          toast.success('account deleted')
          navigate('/login')
          localStorage.removeItem("token")
        }
        else{
          toast.success(res.data.message)
          console.log(res.data.message)
        }
      }
    } catch (error) {
      toast.success(error.message)
      console.log(error.message)
    }
  }

  const fetchuser = async () => {
    try {
      const usr = await axios.get(backendURL + '/api/user/getuser', { headers: { token } });
      setuser(usr.data.user)
      console.log(usr.data.user)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (token) {
      fetchuser()
    }
  }, [token])

  return (!user || user === null) ? (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and addresses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-600" />
                  Personal Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    Email Address
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600" />
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={user.address[0]?.phone || "Not provided"}
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Package className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Orders</h2>
                    <p className="text-sm text-gray-600">Track and manage your purchases</p>
                  </div>
                </div>
                <button onClick={() => navigate('/order')} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-300">
                  View All Orders
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Ready to shop again?</p>
                    <p className="text-sm text-gray-600">Explore our latest jewellery collections</p>
                  </div>
                  <button onClick={() => navigate('collection')} className="px-4 py-2 bg-white text-amber-700 border border-amber-300 font-medium rounded-lg hover:bg-amber-50 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Addresses */}
          <div className="space-y-8">
            {/* Saved Addresses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Saved Addresses
                </h2>
              </div>

              <div className="space-y-4">
                {user.address?.map((addr, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border transition-all duration-300 ${addr.isDefault
                      ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100/30'
                      : 'border-gray-200 bg-white hover:border-amber-300'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {addr.isDefault ? 'Primary Address' : 'Address'}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        {!addr.isDefault && (
                          <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-gray-700">
                      <p className="font-medium">{addr.firstname} {addr.lastname}</p>
                      <p className="text-sm">{addr.street}</p>
                      <p className="text-sm">
                        {addr.city}, {addr.state} - {addr.zipcode}
                      </p>
                      <p className="text-sm">{addr.country}</p>
                      <p className="text-sm font-medium pt-2">📞 {addr.phone}</p>
                    </div>

                    {addr.isDefault && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                          Default Address
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                Account Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between py-3 px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition duration-200 group">
                  <span onClick={() => delacc()} className="font-medium">Delete Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl border border-amber-200 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Assistance?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our customer support team is available 24/7 to help you.
                  </p>
                  <button onClick={() => navigate('contact')} className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;