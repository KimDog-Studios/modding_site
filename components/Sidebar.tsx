'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { HomeIcon, UserCircleIcon, CogIcon, UploadIcon, MenuIcon } from "@heroicons/react/outline";
import { FormGroup, FormControlLabel, Checkbox, TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { mods as modData } from '@/components/Main';  // Import DLC data if needed

type Props = {
  selectedFilters: string[];
  onFilterChange: (game: string, checked: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSidebarVisible: boolean;
};

type Mod = {
  title: string;
  game: string;
};

const Sidebar: React.FC<Props> = ({ selectedFilters, onFilterChange, searchQuery, onSearchChange, isSidebarVisible }) => {
  const [localSidebarVisible, setLocalSidebarVisible] = useState<boolean>(isSidebarVisible);
  const [searchResults, setSearchResults] = useState<Mod[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSidebarVisible(isSidebarVisible);
  }, [isSidebarVisible]);

  useEffect(() => {
    const results = modData.filter(mod => //+
      mod.title.toLowerCase().includes(searchQuery.toLowerCase())//+
    );//+

    const appliedFilters = new Set<string>();
    results.forEach(mod => appliedFilters.add(mod.game));
    modData.forEach(mod => {//+
      if (selectedFilters.includes(mod.game) && !appliedFilters.has(mod.game)) {
        onFilterChange(mod.game, false);
      }
    });

  }, [searchQuery, selectedFilters, onFilterChange]);

  const toggleSidebar = () => {
    setLocalSidebarVisible(prevState => !prevState);
  };

  const handleSearchChange = (query: string) => {
    onSearchChange(query);
  };

  const handleSuggestionClick = (mod: Mod) => {
    onSearchChange(mod.title);
    onFilterChange(mod.game, true);
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    setSearchResults([...modData]);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!searchRef.current?.contains(e.relatedTarget as Node)) {
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    setSearchResults([]);
    [...modData].forEach(mod => {
      if (selectedFilters.includes(mod.game)) {
        onFilterChange(mod.game, false);
      }
    });
  };

  const handleCheckboxChange = (game: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(game, event.target.checked);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Top Navigation Bar */}
      <div className='flex items-center justify-between bg-[#1E1E1E] p-2 shadow-md fixed top-0 left-0 right-0 z-10'>
        <div className='flex items-center space-x-4'>
          {/* Toggle Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className='text-white p-2 hover:bg-gray-700 rounded-md transition md:hidden'
            aria-label={localSidebarVisible ? 'Hide Filters' : 'Show Filters'}
          >
            <MenuIcon className='w-6 h-6' />
          </button>

          <Link href="/" className='flex items-center space-x-2 text-white hover:text-purple-500 transition'>
            <HomeIcon className='w-6 h-6 md:w-8 md:h-8' />
            <p className='text-sm md:text-base'>Home</p>
          </Link>
        </div>

        <div className='flex items-center justify-center flex-grow'>
          <div className='relative w-80' ref={searchRef} onBlur={handleBlur}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleFocus}
              className='w-full'
              InputProps={{
                style: {
                  backgroundColor: '#2E2E2E',
                  color: 'white',
                },
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSearch} edge="end">
                      <ClearIcon style={{ color: 'white' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              InputLabelProps={{
                style: { color: '#B0B0B0' },
              }}
            />
            {showSuggestions && searchResults.length > 0 && (
              <div className='absolute bg-[#1E1E1E] w-full mt-2 p-2 border border-gray-700 rounded-md'>
                {searchResults.map((mod, index) => (
                  <div
                    key={index}
                    className='text-white hover:bg-gray-700 p-2 rounded-md cursor-pointer flex justify-between'
                    onClick={() => handleSuggestionClick(mod)}
                    tabIndex={0}
                  >
                    <span>{mod.title} | {mod.game}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar with Filters */}
      <div
        className={`fixed top-16 md:top-16 left-0 md:left-0 bg-[#1E1E1E] border-r border-gray-700 p-4 md:w-64 md:h-screen overflow-y-auto z-10 transition-transform duration-300 ${
          localSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className='text-lg font-semibold mb-4'>Filters</h2>
        <FormGroup>
          <h2 className='text-lg font-semibold'>Games:</h2>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFilters.includes('ATS')}
                onChange={handleCheckboxChange('ATS')}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 24 },
                  color: '#B0B0B0',
                  '&.Mui-checked': {
                    color: '#9C27B0',
                  },
                }}
              />
            }
            label="ATS"
            sx={{ mb: 1, color: '#B0B0B0' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFilters.includes('ETS 2')}
                onChange={handleCheckboxChange('ETS 2')}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 24 },
                  color: '#B0B0B0',
                  '&.Mui-checked': {
                    color: '#9C27B0',
                  },
                }}
              />
            }
            label="ETS 2"
            sx={{ mb: 1, color: '#B0B0B0' }}
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default Sidebar;
