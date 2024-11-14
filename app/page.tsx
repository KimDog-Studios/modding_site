import Topbar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCards';

export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* ATS Realistic Economy Mod */}
          <a 
            href="/ATS/RealisticEconomy"  // Replace with the actual product page link
            className="transition-transform transform hover:scale-105 hover:shadow-lg hover:outline hover:outline-2 hover:outline-blue-500 rounded-lg overflow-hidden"
          >
            <ProductCard
              imageSrc="https://www.ironfx.com/wp-content/uploads/2023/06/global-economy-impact-trading.jpg"
              title="KimDog's Realistic Economy Mod"
              description="American Truck Simulator (ATS)"
              price="$0.00"
            />
          </a>

          {/* ATS Realistic Economy Mod */}
          <a 
            href="/ETS2/RealisticEconomy"  // Replace with the actual product page link
            className="transition-transform transform hover:scale-105 hover:shadow-lg hover:outline hover:outline-2 hover:outline-blue-500 rounded-lg overflow-hidden"
          >
            <ProductCard
              imageSrc="https://www.ironfx.com/wp-content/uploads/2023/06/global-economy-impact-trading.jpg"
              title="KimDog's Realistic Economy Mod"
              description="Euro Truck Simulator 2 (ETS2)"
              price="$0.00"
            />
          </a>


        </div>
      </div>
    </div>
  );
}
