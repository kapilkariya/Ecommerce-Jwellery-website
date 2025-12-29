import React from 'react';

const SocialIcon = ({ path }) => (
  <svg className="w-5 h-5 transition duration-200 hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const Footer = () => {
  const sections = {
    SHOP: ["Rings","Necklaces","Earrings","Bracelets","New Arrivals"],
    COMPANY: ["About Us","Careers","Blog","Sustainability"],
    SUPPORT: ["Contact Us","FAQ","Shipping & Returns","Product Care & Warranty"]
  };

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4 tracking-wider font-serif">SPARKNEST</h3>
          <p className="text-sm">Timeless pieces crafted for the modern soul. Experience luxury redefined.</p>
        </div>
        {Object.entries(sections).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-2 text-sm">
              {links.map(link => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-white transition duration-150">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} SparkNest. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com"><SocialIcon path="M21 8.25c0-1.874-1.121-2.074-2.121-2.074h-1.758c-.99 0-2.091.229-3.23.498-1.124.265-2.285.498-3.414.498s-2.29-.233-3.414-.498c-1.139-.269-2.24-.498-3.23-.498H5.121C4.121 6.18 3 6.38 3 8.25V19.5a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 19.5V8.25Z" /></a>
            <a href="https://twitter.com"><SocialIcon path="M19.5 9l-1.424 5.92c-.14.58-.871 1.05-1.488 1.05H6.912c-.617 0-1.348-.47-1.488-1.05L4.5 9h15z" /></a>
            <a href="https://facebook.com"><SocialIcon path="M16 3H8A5 5 0 0 0 3 8v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm4-5c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4Z" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
