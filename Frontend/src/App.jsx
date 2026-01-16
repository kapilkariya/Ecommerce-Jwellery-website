import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Order from './pages/Order';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Searchbar from './components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import Profile from './components/Profile';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer/>
      <Navbar />
      <Searchbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;





