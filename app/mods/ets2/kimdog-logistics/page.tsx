'use client';

import Sidebar from '@/components/Sidebar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageList, ImageListItem } from '@mui/material';
import { Mod } from '@/components/Main';
import GradientCircularProgress from "@/components/Main"

// Filtering and searching function to apply selected filters and search query
const filterAndSearchMods = (mods: Mod[], filters: string[], query: string): Mod[] => {
  return mods.filter(mod => {
    // Check if the mod passes the filter
    const isFiltered = filters.length === 0 || filters.includes(mod.game);
    // Check if the mod matches the search query (case-insensitive)
    const matchesSearch = mod.title.toLowerCase().includes(query.toLowerCase()) ||
                           mod.author.toLowerCase().includes(query.toLowerCase());
    return isFiltered && matchesSearch;
  });
};

// Transition component for the dialog
const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const itemData = [
  { img: '/assets/mods/kimdog-logistics-ets2/1.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/2.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/3.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/4.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/5.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/6.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/7.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/8.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/9.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/10.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/11.png' },
  { img: '/assets/mods/kimdog-logistics-ets2/12.png' }
];

function Page() {
  // Define state variables
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true); // Add loading state

    // Simulate data fetching or loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 2200);
        return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <GradientCircularProgress />
        </div>
    );
  }

  // Handlers
  const handleFilterChange = (game: string, checked: boolean) => {
    setSelectedFilters(prevFilters =>
      checked ? [...prevFilters, game] : prevFilters.filter(filter => filter !== game)
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    // Open the direct download link in a new tab
    window.open('https://drive.google.com/uc?export=download&id=1B0x5e4zPx8RaxK1aduHPZ6kgnN9jBI0_', '_blank');
    setOpen(false);
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isSidebarVisible={true}
      />

      {/* Main Content */}
      <div className='flex-1 mt-0 p-8'>
        {/* Title */}
        <div className='flex justify-center items-center mt-10'>
          <h1 className='font-bold text-3xl'>KimDog's Logistics</h1>
        </div>

        {/* In-Game Images and Description */}
        <div className='flex flex-col md:flex-row mt-14'>
          {/* Images Section */}
          <div className='flex-1 md:mr-8'>
            <div className='w-full flex justify-center ml-56 -mt-11'>
              <ImageList sx={{ width: 800, height: 600 }} cols={3} rowHeight={126}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <Image
                      src={item.img}
                      alt='Game Image'
                      width={256}
                      height={256}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>

          {/* Description Section */}
          <div className='flex-1'>
            <h2 className='text-xl font-bold mb-4'>Description:</h2>
            <p className='text-lg'>
              This mod pack includes all sorts of Mods inside!<br />
              Skinned AI!<br />
              Buildings and Companies coming in the future!
            </p>
            <div className='mt-4'>
              <Button variant="contained" onClick={handleClickOpen}>
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Dialog for Confirmation */}
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm Download
          </DialogTitle>
          <DialogContent>
            <p>Are you sure you want to download the mod pack?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleProceed} color="primary" autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Page;
