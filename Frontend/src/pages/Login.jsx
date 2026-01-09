import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentstate, setcurrentstate] = useState('Login')
  const { token, settoken, navigate, backendURL } = useContext(ShopContext);
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')


  

  useEffect(() => {
      const handleauth = async () => {
        const params = new URLSearchParams(window.location.search);
        const accesstoken = params.get("token")
        if (accesstoken) {
          localStorage.setItem('token', accesstoken);
          settoken(accesstoken);
          navigate('/')
          window.history.replaceState({}, document.title, "/");
        }
      }
      handleauth()
    }, [])
  
  const handleSubmit = async (e) => {


    //to prevent reloading of page 
    e.preventDefault()
    try {
      if (currentstate === 'Sign up') {
        const response = await axios.post(backendURL + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success("signed in successfully")
          settoken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendURL + '/api/user/login', { email, password })
        if (response.data.success) {
          localStorage.setItem('userid', response.data.userid);
          localStorage.setItem('token', response.data.token)
          toast.success("logged in successfully")
          settoken(response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
    }
    catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 mx-auto flex flex-col items-center bg-white">
        <h2 className="text-3xl prata-regular font-medium text-gray-800 mb-8 tracking-wider">{currentstate} &mdash;</h2>
        {currentstate !== 'Login' && <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full p-3 mb-4 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />}
        <input onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full p-3 mb-4 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />
        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full p-3 mb-8 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-400 rounded-sm focus:outline-none focus:border-black transition duration-150" />
        <div className="w-full flex justify-between text-sm mt-[-20px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentstate === 'Login' ? <p onClick={() => setcurrentstate('Sign up')} className="cursor-pointer">Create account</p> : <p onClick={() => setcurrentstate('Login')} className="cursor-pointer">Login Here</p>}
        </div>
        <button type="submit" className="bg-black text-white py-2 px-8 m-4 w-full active:bg-gray-700">{currentstate === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        <button onClick={()=>window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,"_self")} type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-sm hover:bg-gray-50 transition duration-150">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62   0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  )
}

export default Login
