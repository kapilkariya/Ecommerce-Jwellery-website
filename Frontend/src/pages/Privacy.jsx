import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Privacy Policy
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
            At <span className="font-semibold text-amber-700">Unifindhub</span>, we value your
            privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your
            data when you use our website.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-xl">
              📋
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may collect personal information such as your name, phone
                number, email address, shipping address, and payment details when
                you place an order or create an account on our website.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Name</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Phone Number</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Email Address</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Shipping Address</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Payment Details</span>
              </div>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-lg text-xl">
              🎯
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Your information is used to process orders, improve customer
                experience, provide support, send order updates, and enhance our
                website services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {[
                  "Process orders",
                  "Improve customer experience",
                  "Provide support",
                  "Send order updates",
                  "Enhance website services"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Security */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-xl">
              💳
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use secure payment gateways to process transactions. Your payment
                details are not stored on our servers.
              </p>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  🔒 PCI compliant payment processing • SSL encryption • No storage of card details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-2 rounded-lg text-xl">
              🍪
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may use cookies to improve browsing experience, analyze
                website traffic, and personalize content for users.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <span>⚙️ You can manage cookie preferences in your browser settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-2 rounded-lg text-xl">
              🛡️
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Data Protection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We take reasonable security measures to protect your personal
                information from unauthorized access, misuse, or disclosure.
              </p>
              <div className="mt-3 flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Encryption</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Access Controls</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>Regular Audits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2 rounded-lg text-xl">
              🔗
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We may use trusted third-party services such as payment gateways,
                delivery partners, and analytics tools to operate our website
                efficiently.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Payment Gateways</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Delivery Partners</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Analytics Tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start gap-4">
            <div className="bg-teal-100 p-2 rounded-lg text-xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You have the right to:
              </p>
              <div className="space-y-2">
                {[
                  "Access your personal data",
                  "Request correction of inaccurate data",
                  "Request deletion of your data",
                  "Opt-out of marketing communications"
                ].map((right, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="text-teal-500">•</span>
                    <span>{right}</span>
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

export default Privacy;