'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Tooltip } from '@mui/material';
import { mods as allMods, verifiedAuthors, Mod } from '@/components/Main'; // Import data script
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
    <div className='flex h-screen overflow-hidden bg-gradient-to-b bg-black'>
      {/* Sidebar */}
      <Sidebar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isSidebarVisible={isSidebarVisible}
      />

      <div className={`flex transition-transform duration-300 mt-8 overflow-auto`}>
        {/* Main Content */}
        <div className='p-6'>
          {/* Combined Section */}
          <div className='mt-6'>
            {Object.keys(groupedItems).map(game => (
              <div key={game} className='mb-12'>
                <h4 className='text-3xl font-bold text-white mb-6'>{game}</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {groupedItems[game].map(item => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className='relative bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-2xl hover:outline outline-2 outline-indigo-500'
                    >
                      <div className='w-32 h-32 flex items-center justify-center overflow-hidden bg-black rounded-lg'>
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={128} // Fixed width for image
                          height={128} // Fixed height for image
                          className='object-cover'
                        />
                      </div>
                      <p className='text-white text-center mt-4 text-lg font-semibold'>{item.title}</p>
                      <div className='text-sm text-gray-400 mt-2'>Game: {item.game}</div>
                      <div className='text-sm text-gray-400'>Convoy: {item.mp_optional}</div>
                      <div className='text-sm text-gray-400 mb-4'>Game Version: {item.version}</div>
                      <div className='flex justify-center items-center text-sm text-gray-300'>
                        <FaUser className='mr-2' />
                        {item.author}
                        {verifiedAuthors.includes(item.author) && (
                          <FaCheckCircle className='ml-2 w-4 h-4 text-blue-500' />
                        )}
                      </div>
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
