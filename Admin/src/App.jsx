import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { ToastContainer } from 'react-toastify'; 

export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const currency='₹'

const App = () => {
  const [token, settoken] = React.useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  useEffect(()=>{
    localStorage.setItem('token',token)
  })

  return (<div className='bg-gray-50 min-h-screen'>
    <ToastContainer/>
    {token === "" ? <Login settoken={settoken} /> : <>
      <Navbar settoken={settoken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div>
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </>}

  </div>
  )
}

export default App  