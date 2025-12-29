import React from 'react'

const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-4 justify-between'>
      <div className="logo mr-5 flex items-center space-x-2 cursor-pointer" aria-label="SparkNext home">
        <div className="w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 3v2.35M16.24 7.76l-1.77 1.77M21 12h-2.35M16.24 16.24l-1.77-1.77M12 21v-2.35M7.76 16.24l1.77-1.77M3 12h2.35M7.76 7.76l1.77 1.77" />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-slate-800">Spark</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">Next</span>
        </span>
      </div>

      <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>LogOut</button>
    </div>
  )
}

export default Navbar