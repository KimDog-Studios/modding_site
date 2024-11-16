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

// Define Mod interface
export interface Mod {
  id: number;
  img: string;
  title: string;
  game: string;
  version: string;
  author: string;
  link: string;
  mp_optional: string;
}

// Define Profile interface
export interface Profile {
  id: number;
  name: string;
  username: string;
  img: string;
  location: string;
  link: string;
  company: string;
  author: string;
}

const verifiedAuthors = ['KimDog', 'SCS Software'];

// Mod Data
const mods: Mod[] = [
  {
    id: 1,
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/KimDogLogo.png',
    title: "KimDog's Network Mod Pack",
    game: "ETS 2",
    version: "1.52",
    author: "KimDog",
    link: "/mods/ets2/kimdog-network-mod-pack",
    mp_optional: 'Yes',
  },
  {
    id: 2,
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/DLC/ETS2.jpeg',
    title: "ETS 2 All DLC",
    game: "ETS 2",
    version: "1.52",
    author: "MosbyMods.de",
    link: "/dlc/ets2",
    mp_optional: 'Yes',
  },
  {
    id: 3,
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/KimDogLogo.png',
    title: "Realistic Economy",
    game: "ATS",
    version: "1.52",
    author: "KimDog",
    link: "/mods/ats/realistic_economy",
    mp_optional: 'Yes',
  },
  {
    id: 4,
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/DLC/ATS.webp',
    title: "ATS All DLC",
    game: "ATS",
    version: "1.52",
    author: "MosbyMods.de",
    link: "/dlc/ats",
    mp_optional: 'Yes',
  },
  {
    id: 5,
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/Mods/christmas_update/jbm_christmas.jpg',
    title: "KimDog's Network Christmas Update",
    game: "ETS 2",
    version: "1.52",
    author: "KimDog",
    link: "/dlc/ats",
    mp_optional: 'Yes',
  },
];

// Profile Data
const profiles: Profile[] = [
  {
    id: 1,
    name: "ETS 2 Modded Profile",
    username: "KimDog Network",
    company: "KimDog Logistics",
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/DLC/ETS2.jpeg',
    location: "Europe",
    link: "/profiles/ets2_modded_profile",
    author: "KimDog",
  },
  {
    id: 2,
    name: "ATS Modded Profile",
    username: "KimDog Network",
    company: "KimDog Logistics",
    img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/DLC/ATS.webp',
    location: "USA",
    link: "/profile/janesmith",
    author: "KimDog",
  },
];

export { mods, profiles, verifiedAuthors };
