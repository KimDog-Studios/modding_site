import React from 'react';
import Image from 'next/image';
import { FaUser, FaCheckCircle } from 'react-icons/fa';
import { verifiedAuthors } from './Main';

const modsData = [
  { title: "KimDog's Realistic Economy", img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/Mods/ATS/Economy/icon.jpg', link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3365680923', mp_optional: 'Yes', game: "American Truck Simulator", version: "1.52", author: "KimDog" },
  { title: "KimDog's Network Mod Pack", img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/KimDogLogo.png', link: '/mods/ets2/kimdog-network-mod-pack', mp_optional: 'Yes', game: "Euro Truck Simulator 2", version: "1.52", author: "KimDog" },
  { title: "KimDog's Network Christmas Update", img: 'https://raw.githubusercontent.com/KimDog-Studios/modding_site/main/public/assets/Mods/ETS2/christmas_update/logo.jpg', link: '/mods/ets2/christmas_update', mp_optional: 'Yes', game: "Euro Truck Simulator 2", version: "1.52", author: "KimDog" },
];

function OtherMods() {
  return (
    <div className='flex flex-col items-center justify-center bg-black text-white py-16 px-8'>
      {/* Title Section */}
      <h1 className='text-3xl font-bold mb-10'>Check Out These Other Mods:</h1>

      {/* Mods Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {modsData.map((mod, index) => (
          <a
            key={index}
            href={mod.link}
            rel='noopener noreferrer'
            className='group flex flex-col items-center p-4 bg-gray-800 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:outline outline-blue-500'
          >
            {/* Mod Image */}
            <div className='w-48 h-48 relative mb-4'>
              <Image
                src={mod.img}
                alt={mod.title}
                width={256} // Setting explicit width
                height={192} // Setting explicit height
                className='rounded-lg object-cover group-hover:opacity-90'
              />
            </div>

            {/* Mod Title */}
            <h2 className='text-xl font-semibold'>{mod.title}</h2>
            <div className='text-sm text-gray-400 mt-2'>Game: {mod.game}</div>
            <div className='text-sm text-gray-400'>Convoy: {mod.mp_optional}</div>
            <div className='text-sm text-gray-400 mb-4'>Game Version: {mod.version} </div>
            <div className='flex justify-center items-center text-sm text-gray-300'>
              <FaUser className='mr-2' />
              {mod.author}
              {verifiedAuthors.includes(mod.author ?? '') && (
                <FaCheckCircle className='ml-2 w-4 h-4 text-blue-500' />
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OtherMods;
