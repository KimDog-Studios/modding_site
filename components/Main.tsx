import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

// Gradient Circular Progress Component
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

// LoadingScreen Component
export default function LoadingScreen() {
  return (
    <Box
      className='fixed inset-0 flex items-center justify-center z-50'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scale: '1.26',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
        borderRadius: '8px', // Optional: Add border radius
      }}
    >
      <Stack spacing={2} alignItems="center">
        <GradientCircularProgress />
        <div className='text-xl font-black text-white'>Loading...</div>
      </Stack>
    </Box>
  );
}

export interface Mod {
  id: number;
  img: string;
  title: string;
  game: string;
  version: string;
  author: string;
  downloadCount: number;
  link: string;
}

const verifiedAuthors = ['KimDog', 'SCS Software'];

const mods: Mod[] = [
    {
      id: 1,
      img: '/assets/KimDogLogo.png',
      title: "KimDog's Network Mod Pack",
      game: "ETS 2",
      version: "1.52",
      author: "KimDog",
      downloadCount: 0, // Static download count
      link: "/mods/ets2/kimdog-network-mod-pack",
    }
];

export { mods, verifiedAuthors };