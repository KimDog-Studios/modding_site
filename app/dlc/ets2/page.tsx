'use client';

import Sidebar from '@/components/Sidebar';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageList, ImageListItem } from '@mui/material';
import GradientCircularProgress from '@/components/Main';

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const itemData = [
  { img: '/assets/DLC/ETS2/1.jpg' },
  { img: '/assets/DLC/ETS2/2.jpg' },
  { img: '/assets/DLC/ETS2/3.jpg' },
  { img: '/assets/DLC/ETS2/4.jpg' },
  { img: '/assets/DLC/ETS2/5.jpg' },
  { img: '/assets/DLC/ETS2/6.jpg' },
  { img: '/assets/DLC/ETS2/7.jpg' },
  { img: '/assets/DLC/ETS2/8.jpg' },
  { img: '/assets/DLC/ETS2/9.jpg' },
  { img: '/assets/DLC/ETS2/10.jpg' },
];

const modName = [{ name: "ETS 2 All DLC" }];

function Page() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-black'>
        <GradientCircularProgress />
      </div>
    );
  }

  const handleFilterChange = (game: string, checked: boolean) => {
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, game] : prevFilters.filter((filter) => filter !== game)
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
    window.open(
      'https://modsfire.com/cI9o0331c0gM1L0',
      '_blank'
    );
    setOpen(false);
  };

  return (
    <div className='flex bg-black min-h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isSidebarVisible={true}
      />

      {/* Main Content */}
      <div className='flex-1 p-8 text-white'>
        {/* Title */}
        <div className='flex justify-center items-center mt-24 mb-12'>
          <h1 className='font-bold text-4xl'>{modName[0].name}</h1>
        </div>

        {/* In-Game Images and Description */}
        <div className='flex flex-col md:flex-row mt-10 gap-10'>
          {/* Images Section */}
          <div className='flex-1 flex justify-center md:justify-end max-h-screen'>
            <ImageList
              sx={{
                width: 680,
                height: 680,
                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
              }}
              cols={2}
              rowHeight={150}
              gap={20}
            >
              {itemData.map((item) => (
                <ImageListItem
                  key={item.img}
                >
                  <Image
                    src={item.img}
                    alt='Game Image'
                    width={320}
                    height={300}
                    className='rounded-lg'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          {/* Description Section */}
          <div className='flex-1 md:ml-12'>
            <h2 className='text-2xl font-bold mb-4'>Description:</h2>
            <p className='text-lg leading-relaxed'>
              This includes all the ETS 2 DLC:
              <ul className='list-disc ml-5 mt-2'>
                <li>Beyond the Baltic Sea</li>
                <li>Going East</li>
                <li>Heart of Russia</li>
                <li>Iberia</li>
                <li>Italia</li>
                <li>Road to the Black Sea</li>
                <li>Scandinavia</li>
                <li>Vive LA France</li>
                <li>Nordic Horizons</li>
                <li>Greece</li>
              </ul>
              <br />
            </p>
            <div className='mt-8'>
              <Button variant='contained' color='primary' onClick={handleClickOpen}>
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
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Confirm Download</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to download: {modName[0].name}?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleProceed} color='primary' autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Page;
