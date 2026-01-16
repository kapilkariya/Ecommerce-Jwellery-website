import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Shield, 
  Edit2,
  Plus,
  Trash2
} from 'lucide-react';

const Profile = () => {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    addresses: [
      {
        id: 1,
        type: "Home",
        name: "Alex Johnson",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567",
        isDefault: true
      },
      {
        id: 2,
        type: "Office",
        name: "Alex Johnson",
        address: "456 Business Ave",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11201",
        phone: "+1 (555) 987-6543",
        isDefault: false
      }
    ]
  };

  const recentOrders = [
    { id: 1, orderNumber: "ORD-789012", date: "2023-12-15", total: "$245.99", status: "Delivered" },
    { id: 2, orderNumber: "ORD-789011", date: "2023-12-10", total: "$189.50", status: "Shipped" },
    { id: 3, orderNumber: "ORD-789010", date: "2023-12-05", total: "$325.75", status: "Processing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information, orders, and addresses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
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
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      Verified
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={user.phone}
                        readOnly
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Recent Orders
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Orders →
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">Placed on {order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{order.total}</div>
                      <div className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200">
                Go to Your Orders
              </button>
            </div>
          </div>

          {/* Right Column - Addresses */}
          <div className="space-y-8">
            {/* Saved Addresses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Saved Addresses
                </h2>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <div key={address.id} className={`p-4 rounded-lg border ${address.isDefault ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{address.type}</span>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{address.name}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!address.isDefault && (
                          <button className="p-1.5 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>{address.address}</div>
                      <div>{address.city}, {address.state} {address.zipCode}</div>
                      <div className="pt-2 text-gray-600">Phone: {address.phone}</div>
                    </div>
                    {address.isDefault && (
                      <button className="mt-4 w-full py-2 text-center text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                        Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our support team is here to help with any questions or issues.
                  </p>
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-3">
                <button className="w-full py-3 text-left px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                  Change Password
                </button>
                <button className="w-full py-3 text-left px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;