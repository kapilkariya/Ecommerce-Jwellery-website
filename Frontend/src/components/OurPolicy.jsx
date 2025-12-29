import React from 'react';

// Simplified Icon component (using hardcoded paths for brevity)
const Icon = ({ path }) => (
  <svg className="w-12 h-12 text-gray-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const OurPolicy = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Policy Item 1: Easy Exchange */}
        <div className="flex flex-col items-center text-center p-4">
          <Icon path="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-6-13L21 7.5m0 0L16.5 12M21 7.5h-18" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Easy Exchange Policy</h3>
          <p className="text-sm text-gray-600">We offer hassle-free exchange policy</p>
        </div>

        {/* Policy Item 2: 7 Days Return */}
        <div className="flex flex-col items-center text-center p-4">
          <Icon path="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">7 Days Return Policy</h3>
          <p className="text-sm text-gray-600">We provide 7 days free return policy</p>
        </div>

        {/* Policy Item 3: Best Customer Support */}
        <div className="flex flex-col items-center text-center p-4">
          <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Best Customer Support</h3>
          <p className="text-sm text-gray-600">Dedicated customer support 24/7</p>
        </div>
        
      </div>
    </div>
  );
};

export default OurPolicy;