import Topbar from '@/components/Sidebar';

export default function RealisticEconomy() {
  return (
    <div>
      <Topbar />
      
      <div className="contain mx-6 flex flex-col items-center space-y-6 p-6">
        {/* Image */}
        <img
          src="https://www.ironfx.com/wp-content/uploads/2023/06/global-economy-impact-trading.jpg"
          alt="Realistic Economy Mod"
          className="w-full max-w-3xl h-auto rounded-lg object-cover"
        />

        {/* Content Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">KimDog Realistic Economy Mod</h2>
          <p className="text-lg text-white mt-2">Euro Truck Simulator 2</p>

          {/* Description */}
          <p className="text-base text-white mt-4 px-6 sm:px-0">
            This mod brings a more realistic economy experience to American Truck Simulator. It
            adjusts various in-game economic factors to make the game feel more immersive and challenging.
            Whether youre a seasoned player or new to ATS, this mod will enhance your experience.
          </p>
          <p className="text-lg text-white mt-4">$0.00</p>

          {/* Add a button or any other action */}
          <div className="mt-6 space-x-2">
            <a
              href=""  // Replace with the actual product page link
              className="inline-block py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Steam Icon Image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/120px-Steam_icon_logo.svg.png"  // Steam logo image URL
                alt="Steam"
                className="w-6 h-6 inline mr-2"
              />
              Steam Workshop | Coming Soon!
            </a>
            <a
              href=""  // Replace with the actual product page link
              className="space-x-4 inline-block py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Local Version | Coming Soon!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
