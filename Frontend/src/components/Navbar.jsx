import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const { showsearch, setshowsearch, getcartcount,token,settoken,setcartitems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onsearch = () => {
    if (location.pathname != '/collection') {
      navigate('/collection')
    }
    setshowsearch(true)
  }

  const logout=()=>{
    localStorage.removeItem('token')
    settoken('')
    setcartitems({})
    navigate('/login')
  }

  return (
    <div className='flex justify-around m-3' >
      <NavLink to='/'>
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
        <div className='relative group'>
          <div className="profileicon ">
          </div>
          <img onClick={()=>token?null:navigate('/login')} className='h-6' src="/icons/profileicon.svg" alt="" />
          {token && <div className=' absolute right-0  group-hover:block hidden  ' >
            <ul className='p-2 w-[110px] bg-slate-100 text-gray-500  rounded-lg my-5'>
              <li className='m-2 cursor-pointer hover:text-black hover:font-bold '>MyProfile</li>
              <li onClick={()=>navigate('/order')} className='m-2 cursor-pointer hover:text-black hover:font-bold'>Orders</li>
              <li onClick={()=>logout()} className='m-2 cursor-pointer hover:text-black hover:font-bold'>LogOut</li>
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
