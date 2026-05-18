import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Terms & Conditions
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
            Welcome to <span className="font-semibold text-amber-700">Unifindhub</span>. By
            accessing and using our website, you agree to follow the terms and
            conditions mentioned below.
          </p>
        </div>

        {/* Product Information */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-xl">
              📦
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Product Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We try our best to provide accurate product images, descriptions,
                pricing, and details. However, slight variations in color or design
                may occur due to lighting, photography, or screen settings.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <span>🎨</span>
                <span>Actual product may vary slightly from images</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-lg text-xl">
              💲
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Pricing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All product prices displayed on the website are subject to change
                without prior notice. We reserve the right to modify or discontinue
                products at any time.
              </p>
              <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Prices inclusive of GST</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>No hidden charges</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders & Payments */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-xl">
              💳
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Orders & Payments
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Customers must provide accurate billing and shipping details while
                placing orders. Payments are processed securely through trusted
                payment gateway partners.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Credit/Debit Cards</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">UPI</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Net Banking</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Wallets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation & Refund */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-lg text-xl">
              🔄
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Cancellation & Refund
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Orders can only be cancelled before shipment. Refunds, if approved,
                will be processed according to our cancellation and refund policy.
              </p>
              <div className="mt-3 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  ⏰ Cancellation requests accepted only before shipment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2 rounded-lg text-xl">
              ©️
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All website content including images, logos, product designs, text,
                and graphics are the property of Unifindhub and should not be copied
                or used without permission.
              </p>
              <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>All rights reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Responsibility */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-2 rounded-lg text-xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Responsibility
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Users must not misuse the website, attempt unauthorized access, or
                engage in activities that may harm the website or other users.
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>❌</span>
                  <span>No unauthorized access attempts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>❌</span>
                  <span>No harmful activities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>❌</span>
                  <span>No misuse of website features</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Registration */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-teal-100 p-2 rounded-lg text-xl">
              📝
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Account Registration
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                To place orders, you may need to create an account. You are responsible for:
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Maintaining confidentiality of your account credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>All activities that occur under your account</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Providing accurate and updated information</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-gray-100 p-2 rounded-lg text-xl">
              ⚖️
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Unifindhub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website, to the extent permitted by law.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-2 rounded-lg text-xl">
              📝
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update or modify these terms at any time
                without prior notice. Continued use of the website means acceptance
                of the updated terms.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                <span>🔔</span>
                <span>Check this page regularly for updates</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;