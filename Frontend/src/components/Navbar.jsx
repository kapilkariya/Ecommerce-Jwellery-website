import React, { useContext, useRef,useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const [open, setopen] = useState(false);
  const { showsearch, setshowsearch, getcartcount, token, settoken, setcartitems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setopen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);


  const onsearch = () => {
    if (location.pathname != '/collection') {
      navigate('/collection')
    }
    setshowsearch(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    settoken('')
    setcartitems({})
    navigate('/login')
  }

  return (
    <div className='flex justify-around m-3' >

      {/* this is logo */}
      <NavLink to='/'>
        <div className="logo mr-5 flex items-center space-x-2 cursor-pointer group relative">
          {/* Animated Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-full"></div>

          {/* Premium Diamond Badge */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Platinum Ring */}
            <div className="absolute inset-0 border-2 border-gray-300/70 rounded-full"></div>

            {/* Diamond Center */}
            <div className="relative w-6 h-6 transform rotate-45">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 shadow-inner"></div>
              <div className="absolute inset-0 border border-amber-300/50"></div>

              {/* Diamond Facets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-400/30"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-400/30"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-400/30"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-400/30"></div>

              {/* Center Sparkle */}
              <div className="absolute inset-1 bg-gradient-to-br from-white to-transparent opacity-60 rounded-sm"></div>
            </div>

            {/* Floating Particle */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full animate-pulse"></div>
          </div>

          {/* Luxury Typography */}
          <div className="relative">
            <span className="text-3xl font-black tracking-tighter">
              <span className="relative">
                <span className="text-gray-900 drop-shadow-sm">UNI</span>
                <span className="absolute inset-0 text-gray-900/0 bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  UNI
                </span>
              </span>
              <span className="relative ml-1">
                <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                  FINDS
                </span>
                {/* Gold Overlay Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                  FINDS
                </span>
              </span>
            </span>

            {/* Professional Tagline */}
            <div className="absolute -bottom-4 left-0 w-full flex items-center justify-center">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                PREMIUM JEWELRY
              </span>
            </div>
          </div>

          {/* Subtle Hover Indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent transition-all duration-500"></div>
        </div>
      </NavLink>

      <ul className='hidden sm:flex gap-5 font-bold text-gray-700 m-1' >
        <NavLink className='flex flex-col gap-1 items-center' to='/' >
          <h1>HOME</h1>
          <hr className='w-1/2 h-[1.5px] bg-gray-800 hidden' />
        </NavLink>

        <NavLink className='flex flex-col gap-1 items-center' to='/collection' >
          <h1>COLLECTION</h1>
          <hr className='w-1/2 h-[1.5px] bg-gray-800 hidden' />
        </NavLink>

        <NavLink className='flex flex-col gap-1 items-center' to='/about' >
          <h1>ABOUT</h1>
          <hr className='w-1/2 h-[1.5px] bg-gray-800 hidden' />
        </NavLink>

        <NavLink className='flex flex-col gap-1 items-center' to='/contact' >
          <h1>CONTACT</h1>
          <hr className='w-1/2 h-[1.5px] bg-gray-800 hidden' />
        </NavLink>
      </ul>

      <div className='flex gap-5 items-center'>
        <div className="search">
          <img onClick={() => { onsearch() }} className='h-7' src="/icons/search.svg" alt="" />
        </div>
        <div ref={dropdownRef} className='relative group'>
          <div className="profileicon ">
          </div>
          <img onClick={() => token ? setopen(prev => !prev) : navigate('/login')} className='h-6' src="/icons/profileicon.svg" alt="" />
          {token && <div className={` absolute right-0 ${open ? 'block' : 'hidden'} group-hover:block  `} >
            <ul className='p-2 w-[110px] bg-slate-100 text-gray-500  rounded-lg my-5'>
              <li onClick={() => { navigate('/profile') }} className='m-2 cursor-pointer hover:text-black hover:font-bold '>MyProfile</li>
              <li onClick={() => navigate('/order')} className='m-2 cursor-pointer hover:text-black hover:font-bold'>Orders</li>
              <li onClick={() => logout()} className='m-2 cursor-pointer hover:text-black hover:font-bold'>LogOut</li>
            </ul>
          </div>}
        </div>
        <NavLink to='/cart' className='relative'>
          <img className='h-8 font-bold ' src="/icons/cart.svg" alt="" />
          <div className='h-[15px] w-[15px] bg-black text-white rounded-4xl text-[9px] absolute right-0 top-[20px] flex justify-center items-center'>{getcartcount()}</div>
        </NavLink>
        {/* for small screens */}
        <div className='block sm:hidden'>
          <img onClick={() => { setvisible(true) }} className='h-10' src="/icons/menu.svg" alt="" />
        </div>
        <div className={`absolute top-0 right-0 bg-white h-full ${visible ? 'w-full' : 'hidden'}`}>
          <div onClick={() => { setvisible(false) }} className='flex items-center text-gray-600'>
            <img className='h-8 my-3 mx-1' src="/icons/back.svg" alt="" />
            <p>Back</p>
          </div>
          <div className='bg-gray-600 w-full h-[1.5px] '></div>
          <div className='flex flex-col text-gray-600'>
            <div>
              <NavLink onClick={() => { setvisible(false) }} className='block px-5 py-4' to='/'>HOME</NavLink>
              <div className='bg-gray-600 w-full h-[1.5px]'></div>
            </div>
            <div>
              <NavLink onClick={() => { setvisible(false) }} className='block px-5 py-4' to='/collection'>COLLECTION</NavLink>
              <div className='bg-gray-600 w-full h-[1.5px]'></div>
            </div>
            <div>
              <NavLink onClick={() => { setvisible(false) }} className='block px-5 py-4' to='/about'>ABOUT</NavLink>
              <div className='bg-gray-600 w-full h-[1.5px]'></div>
            </div>
            <div>
              <NavLink onClick={() => { setvisible(false) }} className='block px-5 py-4' to='/contact'>CONTACT</NavLink>
              <div className='bg-gray-600 w-full h-[1.5px]'></div>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Navbar
