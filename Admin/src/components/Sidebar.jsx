import React, { useState } from 'react';
import { NavLink as Navlink } from 'react-router-dom';

const PlusCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" />
  </svg>
);
const ListChecksIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 12 2 2 4-4" /><path d="M11 6h9" /><path d="M11 12h9" /><path d="M11 18h9" /><path d="M3 18l2 2 4-4" /><path d="M3 6l2 2 4-4" />
  </svg>
);
const ShoppingBagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState('add');

  const baseClasses = "flex items-center gap-4 p-3 m-2 cursor-pointer transition-all duration-200 rounded-lg hover:shadow-lg hover:bg-gray-100";
  const textClasses = "hidden sm:inline-block text-sm whitespace-nowrap";

  return (
    <div className=" min-h-[100vh] min-w-15 w-16 sm:w-56 border-r bg-white transition-all duration-300 flex flex-col shadow-xl font-inter no-scrollbar overflow-y-auto">
      <h3 className="text-sm font-bold text-gray-800 hidden sm:block p-4 border-b">MENU</h3>

      {/* Add Items */}
      <Navlink to='/add'>
        <div onClick={() => setCurrentPage('add')} className={`${baseClasses} ${currentPage === 'add' ? "bg-white shadow-md border-r-4 border-orange-500 text-orange-600 font-semibold" : "text-gray-600"}`}>
          <PlusCircleIcon className="w-5 h-5 min-w-[1.25rem] stroke-current" />
          <span className={textClasses}>Add Items</span>
        </div>
      </Navlink>

      {/* List Items */}
      <Navlink to='/list'>
        <div onClick={() => setCurrentPage('list')} className={`${baseClasses} ${currentPage === 'list' ? "bg-white shadow-md border-r-4 border-orange-500 text-orange-600 font-semibold" : "text-gray-600"}`}>
          <ListChecksIcon className="w-5 h-5 min-w-[1.25rem] stroke-current" />
          <span className={textClasses}>List Items</span>
        </div>
      </Navlink>
      {/* Orders */}
      <Navlink to='/orders'>
        <div onClick={() => setCurrentPage('orders')} className={`${baseClasses} ${currentPage === 'orders' ? "bg-white shadow-md border-r-4 border-orange-500 text-orange-600 font-semibold" : "text-gray-600"}`}>
          <ShoppingBagIcon className="w-5 h-5 min-w-[1.25rem] stroke-current" />
          <span className={textClasses}>Orders</span>
        </div>
      </Navlink>
    </div>
  );
};

export default Sidebar;
