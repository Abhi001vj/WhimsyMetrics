import React, { useState } from 'react';
import { Link } from 'wouter';
import WhimsyIcon from '@/icons/WhimsyIcon';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <WhimsyIcon />
            <h1 className="font-display font-bold text-xl md:text-2xl">Whimsy<span className="text-primary">Measure</span></h1>
          </a>
        </Link>
        
        <nav className={`${mobileMenuOpen ? 'flex flex-col absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-50' : 'hidden'} md:flex md:static md:flex-row md:shadow-none md:p-0 md:z-auto space-y-4 md:space-y-0 md:space-x-6`}>
          <Link href="/">
            <a className="font-medium hover:text-primary transition-colors">Home</a>
          </Link>
          <Link href="#about">
            <a className="font-medium hover:text-primary transition-colors">About</a>
          </Link>
          <Link href="#examples">
            <a className="font-medium hover:text-primary transition-colors">Examples</a>
          </Link>
        </nav>
        
        <button 
          className="md:hidden focus:outline-none" 
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
