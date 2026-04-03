import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ settoken }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    settoken('');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  }

  return (
    <div className='flex w-full items-center py-2 px-4 justify-between bg-white'>
      <div onClick={() => navigate('/')} className="logo mr-5 flex items-center space-x-2 cursor-pointer group relative" aria-label="UniFinds home">
        {/* Animated Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-full"></div>

        {/* Premium Diamond Badge */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Platinum Ring */}
          <div className="absolute inset-0 border-2 border-gray-300/70 rounded-full"></div>

          {/* Diamond Center */}
          <div className="relative w-5 h-5 transform rotate-45">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 shadow-inner"></div>
            <div className="absolute inset-0 border border-amber-300/50"></div>

            {/* Diamond Facets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-400/30"></div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-400/30"></div>
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-400/30"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-400/30"></div>

            {/* Center Sparkle */}
            <div className="absolute inset-1 bg-gradient-to-br from-white to-transparent opacity-60 rounded-sm"></div>
          </div>

          {/* Floating Particle */}
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full animate-pulse"></div>
        </div>

        {/* Typography */}
        <span className="text-xl font-bold tracking-tight">
          <span className="text-gray-900">UNI</span>
          <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 bg-clip-text text-transparent">FINDS</span>
        </span>
      </div>

      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full hover:bg-gray-700 transition'>LogOut</button>
    </div>
  )
}

export default AdminNavbar
