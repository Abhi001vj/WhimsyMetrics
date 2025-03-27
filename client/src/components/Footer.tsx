import React from 'react';
import { Link } from 'wouter';
import WhimsyIcon from '@/icons/WhimsyIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <a className="flex items-center space-x-2 mb-4">
                <WhimsyIcon className="w-8 h-8 text-primary" />
                <h2 className="font-display font-bold text-xl">Whimsy<span className="text-primary">Measure</span></h2>
              </a>
            </Link>
            <p className="text-gray-400 max-w-xs">Converting boring measurements into fun, relatable comparisons since 2023.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="GitHub">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">App</h3>
              <ul className="space-y-2">
                <li><Link href="/"><a className="text-gray-400 hover:text-primary transition-colors">Home</a></Link></li>
                <li><Link href="#about"><a className="text-gray-400 hover:text-primary transition-colors">About</a></Link></li>
                <li><Link href="#examples"><a className="text-gray-400 hover:text-primary transition-colors">Examples</a></Link></li>
                <li><Link href="#api"><a className="text-gray-400 hover:text-primary transition-colors">API</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Documentation</a></Link></li>
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Unit Database</a></Link></li>
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Blog</a></Link></li>
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Feedback</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></Link></li>
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></Link></li>
                <li><Link href="#"><a className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a></Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} WhimsyMeasure. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ by measurement enthusiasts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
