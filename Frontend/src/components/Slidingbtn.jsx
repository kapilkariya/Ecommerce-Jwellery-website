import React from 'react'

const Slidingbtn = ({ view, setview }) => {
  return (
    <div className="relative bg-white p-1 rounded-xl w-fit flex gap-1 shadow-inner border border-gray-100">
      {/* Subtle slider */}
      <div 
        className={`
          absolute top-1 bg-gradient-to-r from-blue-50 to-indigo-50 
          border border-blue-100 rounded-lg h-[calc(100%-8px)]
          transition-all duration-200 ease-in-out
          ${view === 'all' ? 'left-1 w-[calc(25%-2px)]' :
            view === 'pending' ? 'left-[calc(25%-0.5px)] w-[calc(25%-2px)]' :
            view === 'delivered' ? 'left-[calc(50%+0.5px)] w-[calc(25%-2px)]' :
            'left-[calc(75%+1.5px)] w-[calc(25%-2px)]'
          }
        `}
      ></div>
      
      <button 
        onClick={() => setview('all')}
        className={`relative z-10 px-6 py-2.5 text-sm rounded-lg min-w-[75px] text-center transition-colors ${
          view === 'all' 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        All
      </button>
      
      <button 
        onClick={() => setview('pending')}
        className={`relative z-10 px-6 py-2.5 text-sm rounded-lg min-w-[75px] text-center transition-colors ${
          view === 'pending' 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Pending
      </button>
      
      <button 
        onClick={() => setview('delivered')}
        className={`relative z-10 px-6 py-2.5 text-sm rounded-lg min-w-[75px] text-center transition-colors ${
          view === 'delivered' 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Delivered
      </button>
      
      <button 
        onClick={() => setview('cancelled')}
        className={`relative z-10 px-6 py-2.5 text-sm rounded-lg min-w-[75px] text-center transition-colors ${
          view === 'cancelled' 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Cancelled
      </button>
    </div>
  )
}

export default Slidingbtn