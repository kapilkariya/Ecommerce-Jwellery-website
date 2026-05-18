import React from "react";

const Cancellation = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Cancellation Policy
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
            At <span className="font-semibold text-amber-700">Unifindhub</span>, we aim to
            provide a smooth shopping experience for our customers. Please read
            our cancellation policy carefully before placing an order.
          </p>
        </div>

        {/* Order Cancellation */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-lg text-xl">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Order Cancellation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Customers can request order cancellation only before the order has been shipped.
                Once the product is shipped, the order cannot be cancelled.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                <span>⚠️</span>
                <span>Pre-shipment cancellations only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Request */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-xl">
              📧
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How to Cancel an Order
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                To cancel your order, please contact our support team with your order details 
                as soon as possible. Our team will verify the order status and process the 
                cancellation if eligible.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 font-medium">📋 Information needed for cancellation:</p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
                  <li>Order Number</li>
                  <li>Email address used for purchase</li>
                  <li>Reason for cancellation (optional)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Information */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-lg text-xl">
              💳
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Refund for Cancelled Orders
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If the cancellation is approved, the refund will be processed to the original 
                payment method within 5-7 business days.
              </p>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  💡 You'll receive a confirmation email once your refund is initiated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Cancellable Orders */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-xl">
              🛡️
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Non-Cancellable Orders
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                The following orders cannot be cancelled:
              </p>
              <div className="space-y-2">
                {[
                  "Customized jewelry pieces",
                  "Personalized items with engravings",
                  "Orders that have already been shipped",
                  "Limited edition or pre-order items"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cancellation;