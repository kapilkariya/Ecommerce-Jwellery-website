import React from 'react';
import { useNavigate } from 'react-router-dom';

const SocialIcon = ({ path }) => (
  <svg className="w-5 h-5 transition duration-200 hover:text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const Footer = () => {
  const {navigate} = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              {/* Logo Icon */}
              <div onClick={()=>{
                navigate('/')
                window.scrollTo({top:0,behaviour:"smooth"})
              }} className="cursor-pointer relative group">
                <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center bg-gradient-to-br from-amber-50/5 to-amber-100/5 backdrop-blur-sm shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-amber-300 to-amber-500 rotate-45 transform shadow-inner">
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
                    </div>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Logo Text */}
              <div onClick={()=>{
                navigate('/')
                window.scrollTo({top:0,behaviour:"smooth"})
              }} className="cursor-pointer flex flex-col">
                <span className="text-2xl font-light tracking-tight text-white">
                  unifinds
                </span>
                <span className="text-xs font-light tracking-widest text-amber-300/80 mt-0.5">
                  FINE JEWELLERY
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Discover timeless elegance with our curated collection of fine jewellery.
              Each piece is crafted to perfection for your special moments.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-amber-600/20 hover:border-amber-500/30 border border-gray-700 transition-all duration-300">
                <SocialIcon path="M16 3H8A5 5 0 0 0 3 8v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm4-5c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4Z" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-amber-600/20 hover:border-amber-500/30 border border-gray-700 transition-all duration-300">
                <SocialIcon path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </a>
              <a href="mailto:info@unifinds.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-amber-600/20 hover:border-amber-500/30 border border-gray-700 transition-all duration-300">
                <SocialIcon path="M2.25 13.5a8.25 8.25 0 0 1 13.86-5.69l.866.866-5.69 5.69A8.25 8.25 0 0 1 2.25 13.5Zm10.5-6.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75Z" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-amber-500/20">Shop</h4>
            <ul className="space-y-3">
              <li>
                <div onClick={() => navigate('/collection')}
                  className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  All Collections
                </div>
              </li>
              <li>
                <div onClick={() => 
                    navigate('/collection')
                  } className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Rings
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Necklaces
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Bracelets
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Mangalsutra
                </div>
              </li>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-amber-500/20">Materials</h4>
            <ul className="space-y-3">
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  American Diamond
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Anti Tarnish
                </div>
              </li>
              <li>
                <div onClick={() => navigate('/collection')} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Rajwadi Brass
                </div>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-amber-500/20">Company</h4>
            <ul className="space-y-3">
              <li>
                <div onClick={() => {
                  navigate('/about')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  About Us
                </div>
              </li>
              <li>
                <div onClick={() => {
                  navigate('/contact')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Contact Us
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Privacy Policy
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-400 hover:text-amber-300 hover:pl-2 transition-all duration-300 cursor-pointer">
                  Shipping & Returns
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Website Owner Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} <span className="text-amber-300">Unifinds Jewellery</span>. All rights reserved.
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                  Terms of Service
                </div>
                <div className="h-4 w-px bg-gray-700"></div>
                <div className="hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </div>
              </div>
            </div>

            {/* Developer Credit - Separated clearly */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                <div className="text-center md:text-left">
                  Website developed by <span className="text-amber-400/80 font-medium">Kapil Kariya</span>
                </div>

                <div className="flex items-center gap-4">
                  <a href="kapilkariya1105@gmail.com"
                    className="hover:text-amber-300 transition-colors duration-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span>developer@example.com</span>
                  </a>

                  <div className="h-3 w-px bg-gray-700"></div>

                  <a href="https://portfolio.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors duration-300">
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;