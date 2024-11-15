'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Tooltip } from '@mui/material';
import { mods as allMods, verifiedAuthors, Mod} from '@/components/Main'; // Import data script
import Image from 'next/image';
import { FaDownload, FaCheckCircle, FaGamepad, FaUser } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import LoadingScreen from '@/components/Main'; // Import the LoadingScreen component

const filterAndSearchItems = (items: (Mod | any)[], filters: string[], query: string): (Mod | any)[] => {
  return items.filter(item => {
    const isFiltered = filters.length === 0 || filters.includes(item.game);
    const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.author.toLowerCase().includes(query.toLowerCase());
    return isFiltered && matchesSearch;
  });
};

const groupByGame = (items: (Mod | any)[]): Record<string, (Mod | any)[]> => {
  return items.reduce((acc, item) => {
    if (!acc[item.game]) {
      acc[item.game] = [];
    }
    acc[item.game].push(item);
    return acc;
  }, {} as Record<string, (Mod | any)[]>);
};

const Page: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const handleFilterChange = (game: string, checked: boolean) => {
    setSelectedFilters(prevFilters =>
      checked ? [...prevFilters, game] : prevFilters.filter(filter => filter !== game)
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredMods = filterAndSearchItems(allMods, selectedFilters, searchQuery);
  // Combine mods and DLCs
  const combinedItems = [...filteredMods];

  // Group combined items by game
  const groupedItems = groupByGame(combinedItems);

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
    <div className='flex h-screen overflow-hidden bg-gray-900'>
      {/* Sidebar */}
      <Sidebar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isSidebarVisible={isSidebarVisible}
      />

      <div className={`flex-grow transition-transform duration-300 ${isSidebarVisible ? 'ml-60' : 'ml-0'} mt-6 overflow-auto`}>
        {/* Main Content */}
        <div className='p-4 sm:p-6 lg:p-8'>
          {/* Combined Section */}
          <div className='mt-6'>
            {Object.keys(groupedItems).map(game => (
              <div key={game} className='mb-12'>
                <h4 className='text-2xl font-bold text-white mb-4'>{game}</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {groupedItems[game].map(item => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className='relative bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center hover:outline hover:outline-2 hover:outline-blue-500 hover:animate-pulseOutline transition-transform duration-250 transform hover:scale-105'
                    >
                      <div className='w-56 h-56 flex items-center justify-center overflow-hidden bg-black rounded-lg'>
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={200} // Fixed width for image
                          height={200} // Fixed height for image
                          className='object-cover'
                        />
                      </div>
                      <Tooltip title={`${item.game}`} arrow>
                        <div className='absolute top-2 left-2 flex items-center bg-gray-800 text-white text-xs px-2 py-1 rounded-full'>
                          <FaGamepad className='mr-1 text-pink-500' />
                          {item.game}
                        </div>
                      </Tooltip>
                      <Tooltip title={`Version ${item.version}`} arrow>
                        <div className='absolute bottom-2 right-2 flex items-center bg-gray-800 text-white text-xs px-2 py-1 rounded-full cursor-pointer'>
                          <FaCheckCircle className='mr-1 text-green-500' />
                          {item.version}
                        </div>
                      </Tooltip>
                      <p className='text-white text-center mt-4 text-md font-semibold'>
                        {item.title}
                      </p>
                      <p className='text-white text-center text-sm mt-2 flex items-center justify-center'>
                        <FaUser className='mr-1 text-white' />
                        {item.author}
                        {verifiedAuthors.includes(item.author) && (
                          <FaCheckCircle className='ml-1 w-4 h-4 text-blue-500' />
                        )}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
