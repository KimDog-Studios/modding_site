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
import OtherMods from '@/components/OtherMods';

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const itemData = [
  { img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/Mods/ETS2/christmas_update/1.webp' },
  { img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/mods/ETS2/christmas_update/2.jpg' },
  { img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/mods/ETS2/christmas_update/3.jpg' },
];

const modName = [{ name: "KimDog's Network Christmas Update" }];

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
      'https://drive.google.com/file/d/1HO0b4pI1Qrt3eIAgntycIGdjbuuAjGxJ/view?usp=sharing',
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
        <div className='flex flex-col md:flex-row mt-5 gap-5'>
          {/* Images Section */}
          <div className='flex-1 flex justify-center md:justify-end'>
            <ImageList
              sx={{
                width: 680,
                height: 680,
                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
              }}
              cols={2}
              rowHeight={100}
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
              This mod pack includes a variety of Changes to the World:
              <ul className='list-disc ml-5 mt-2'>
                <li>Snow</li>
                <li>Christmas Decorations</li>
                <li>Christmas Jobs</li>
                <li>Ice Phyiscs</li>
                <li>Snowy Tyres</li>
              </ul>
              <br />
              Credits to everyone whose items are included in the Mod Pack.
            </p>
            <div className='mt-8'>
              <Button variant='contained' color='primary' onClick={handleClickOpen}>
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-20 font-black text-2xl'>
          <OtherMods/>
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
