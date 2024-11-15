'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Tooltip } from '@mui/material';
import { verifiedAuthors, profiles, Profile } from '@/components/Main'; // Import profiles data
import Image from 'next/image';
import { FaUser, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import LoadingScreen from '@/components/Main'; // Import the LoadingScreen component

// Function to filter and search profiles
const filterAndSearchProfiles = (items: Profile[], query: string): Profile[] => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.username.toLowerCase().includes(query.toLowerCase());
    return matchesSearch;
  });
};

const Page: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Filter profiles based on search query
  const filteredProfiles = filterAndSearchProfiles(profiles, searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='flex h-screen overflow-hidden bg-gradient-to-b bg-black'>
      {/* Sidebar */}
      <Sidebar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isSidebarVisible={isSidebarVisible} selectedFilters={[]} onFilterChange={function (game: string, checked: boolean): void {
          throw new Error('Function not implemented.');
        } }      />

      <div className={`flex transition-transform duration-300 mt-8 overflow-auto`}>
        {/* Main Content */}
        <div className='p-6'>
          {/* Profiles Section */}
          <div className='mt-6'>
            <h4 className='text-3xl font-bold text-white mb-6'>Profiles</h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {filteredProfiles.map(profile => (
                <Link
                  key={profile.id}
                  href={profile.link}
                  className='relative bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-2xl hover:outline outline-2 outline-indigo-500'
                >
                  {/* Profile Image */}
                  <div className='w-32 h-32 flex items-center justify-center overflow-hidden bg-black rounded-lg'>
                    <Image
                      src={profile.img}
                      alt={profile.name}
                      width={128} // Fixed width for image
                      height={128} // Fixed height for image
                      className='object-cover'
                    />
                  </div>

                  {/* Profile Details */}
                  <p className='text-white text-center mt-2 text-lg font-semibold'>{profile.name}</p>
                  <div className='text-sm text-gray-400'>Username: {profile.username}</div>
                  <div className='text-sm text-gray-400'>Company: {profile.company}</div>
                  <div className='text-sm text-gray-400 mb-3'>Location: {profile.location}</div>
                  <div className='flex justify-center items-center text-sm text-gray-300'>
                    <FaUser className='mr-2' />
                    {profile.author}
                    {verifiedAuthors.includes(profile.author) && (
                      <FaCheckCircle className='ml-2 w-4 h-4 text-blue-500' />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;