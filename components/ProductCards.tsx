import React from 'react';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, description, price }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md font-black">
      {/* Product Image */}
      <div className="relative w-full h-64 font-black">
        <img
          src={imageSrc}
          alt={title}
          className="rounded-t-lg"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 font-black">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <span className="font-semibold text-lg">{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
