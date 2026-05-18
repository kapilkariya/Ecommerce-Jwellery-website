import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Shipping Policy
        </h1>
        <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6">
        {/* Introduction */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-amber-700">Unifindhub</span>, we are committed
            to delivering your jewelry products safely and on time.
          </p>
        </div>

        {/* Order Processing */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-xl">
              ⚙️
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Order Processing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Orders are usually processed within 1-3 business days after payment
                confirmation. Orders placed on weekends or public holidays may take
                additional processing time.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <span>⏱️</span>
                <span>Processing time: 1-3 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-lg text-xl">
              🚚
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Delivery Time
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Delivery timelines may vary depending on your location. Most orders
                are delivered within 5-7 business days across India.
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span>🏙️</span>
                  <span className="text-gray-600">Metro cities: 3-5 days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>🏞️</span>
                  <span className="text-gray-600">Other locations: 5-7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-xl">
              💰
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Shipping Charges
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Shipping charges, if applicable, will be displayed during checkout
                before completing the payment.
              </p>
              <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  ✨ Free shipping on orders above ₹999 (if applicable)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-2 rounded-lg text-xl">
              📍
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Order Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Once your order is shipped, tracking details may be shared through
                email, SMS, or WhatsApp for easy order tracking.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">📧 Email</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">📱 SMS</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">💬 WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delayed Deliveries */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-lg text-xl">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Delayed Deliveries
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Delivery delays may occur due to unforeseen circumstances such as
                weather conditions, courier issues, or high order volume. We
                appreciate your patience in such situations.
              </p>
              <div className="mt-3 flex gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                <span>⚠️</span>
                <span>You'll be notified of any significant delays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incorrect Address */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-2 rounded-lg text-xl">
              📍❌
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Incorrect Address
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Customers are requested to provide accurate shipping details. We are
                not responsible for delivery issues caused due to incorrect or
                incomplete addresses.
              </p>
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Double-check your shipping address before placing your order
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2 rounded-lg text-xl">
              🌍
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                International Shipping
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Currently, we ship within India only. International shipping will be available soon.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                <span>🚀</span>
                <span>Coming soon!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500 p-2 rounded-lg text-xl">
              📞
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Shipping Questions?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For shipping-related questions, please contact our support team
                through the contact page available on our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium">
                  📧 Contact Support
                </button>
                <button className="border border-amber-500 text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium">
                  🔍 Track Order
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>📞 Customer Support: Available Mon-Sat, 10 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;