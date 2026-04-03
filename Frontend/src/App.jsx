import { useState, useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import Profile from './pages/Profile';
import { ShopContext } from './context/ShopContext';

// Admin Pages
import AdminAdd from './pages/admin/Add';
import AdminList from './pages/admin/List';
import AdminOrders from './pages/admin/Orders';
import AdminFeedback from './pages/admin/Feedback';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';

// Main Layout for regular pages
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Searchbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Admin Layout Component
const AdminLayout = ({ token, settoken, isAdmin }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className='bg-gray-50 min-h-screen'>
      <AdminNavbar settoken={settoken} />
      <hr />
      <div className='flex w-full'>
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function App() {
  const { token, settoken, isAdmin } = useContext(ShopContext);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer/>
      <Routes>
        {/* Admin Routes */}
        <Route element={<AdminLayout token={token} settoken={settoken} isAdmin={isAdmin} />}>
          <Route path="/admin/add" element={<AdminAdd token={token} />} />
          <Route path="/admin/list" element={<AdminList token={token} />} />
          <Route path="/admin/orders" element={<AdminOrders token={token} />} />
          <Route path="/admin/feedback" element={<AdminFeedback token={token} />} />
        </Route>
        
        {/* Regular Routes */}
        <Route element={<MainLayout />}>
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;





