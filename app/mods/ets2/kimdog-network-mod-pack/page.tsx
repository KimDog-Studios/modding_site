'use client';

import Sidebar from '@/components/Sidebar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageList, ImageListItem } from '@mui/material';
import GradientCircularProgress from "@/components/Main"

// Transition component for the dialog
const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const itemData = [
  { img: '/assets/Mods/ETS2/kimdog_mod_pack/1.png' },
  { img: '/assets/mods/ETS2/kimdog_mod_pack/2.png' },
  { img: '/assets/mods/ETS2/kimdog_mod_pack/3.png' },
  { img: '/assets/mods/ETS2/kimdog_mod_pack/4.png' },
  { img: '/assets/mods/ETS2/kimdog_mod_pack/5.png' },
  { img: '/assets/mods/ETS2/kimdog_mod_pack/6.png' },
];

const modName = [
  { name: "KimDog's Network Mod Pack"}
]

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
    window.open('https://drive.google.com/file/d/1HO0b4pI1Qrt3eIAgntycIGdjbuuAjGxJ/view?usp=sharing', '_blank');
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
          <h1 className='font-bold text-3xl'>{modName[0].name}</h1>
        </div>

        {/* In-Game Images and Description */}
        <div className='flex flex-col md:flex-row mt-14'>
          {/* Images Section */}
          <div className='flex-1 md:mr-8'>
            <div className='w-full flex justify-center ml-56'>
              <ImageList sx={{ width: 800, height: 780 }} cols={2} rowHeight={256}>
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
              . Engines<br />
              . Trucks<br />
              . Tuning Parts<br />
              . Trailers<br />
              . Skins<br />
              . Traffic Adjustments<br />

              Credits to everyones Items that are in the Mod Pack.
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
            <p>Are you sure you want to download this: {modName[0].name}</p>
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
