import React, { useState } from 'react';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  
  const onsubmithandler = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail('');
  }
  
  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3 tracking-tight">
          Subscribe now & get 20% off
        </h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <form onSubmit={onsubmithandler} className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md p-3 border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800 transition duration-150 text-sm rounded-l"
            aria-label="Email address for newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-800 text-white font-semibold uppercase text-xs tracking-widest hover:bg-gray-00 transition duration-200 rounded-r"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetterBox;
