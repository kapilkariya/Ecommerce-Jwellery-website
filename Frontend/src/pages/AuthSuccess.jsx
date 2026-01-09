import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'


const Authsuccess = () => {
  const { token,settoken, navigate} = useContext(ShopContext);

  useEffect(() => {
    const handleauth = async () => {
      console.log('hii')
      const params = new URLSearchParams(window.location.search);
      console.log(params)
      const accesstoken = params.get("token")
      console.log(token)
      if (accesstoken) {
        localStorage.setItem('token', accesstoken);
        settoken(accesstoken);
        navigate('/')
        window.history.replaceState({}, document.title, "/");
      }
    }
    handleauth()
  }, [])

  return (
    <div>

    </div>
  )
}

export default Authsuccess
