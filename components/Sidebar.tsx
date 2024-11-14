import React from 'react';
import { FaSearch, FaHome, FaUser, FaCog } from 'react-icons/fa';
import Link from 'next/link';

const TopBar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">KimDog Modding</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" passHref/>
            <a href="/" className="hover:text-gray-300">
              <FaHome className="inline-block mr-2" />
              Home
            </a>
          
            <a href="/" className="hover:text-gray-300">
              <FaUser className="inline-block mr-2" />
              Profile
            </a>
            <a className="hover:text-gray-300">
              <FaCog className="inline-block mr-2" />
              Settings
            </a>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-3 py-2">
          <input
            type="text"
            className="bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            placeholder="Search..."
          />
          <FaSearch />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl focus:outline-none ml-4">
          ☰
        </button>
      </div>
    </header>
  );
};

export default TopBar;
