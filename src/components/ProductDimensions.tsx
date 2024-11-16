import React from 'react';

interface ProductDimensionsProps {
  width: number;
  height: number;
  depth: number;
}

export const ProductDimensions: React.FC<ProductDimensionsProps> = ({
  width,
  height,
  depth,
}) => {
  return (
    <div className="relative aspect-square bg-gray-100 rounded-lg p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full h-full max-w-[200px]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 3D çanta gösterimi */}
          <rect
            x="40"
            y="40"
            width="120"
            height="120"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />
          <line
            x1="40"
            y1="40"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />
          <line
            x1="160"
            y1="40"
            x2="180"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />
          <line
            x1="40"
            y1="160"
            x2="20"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />
          <line
            x1="160"
            y1="160"
            x2="180"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />
          <rect
            x="20"
            y="20"
            width="160"
            height="160"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          />

          {/* Boyut etiketleri */}
          <text x="100" y="190" textAnchor="middle" className="text-sm">
            Genişlik: {width} cm
          </text>
          <text x="10" y="100" textAnchor="middle" transform="rotate(-90 10 100)" className="text-sm">
            Yükseklik: {height} cm
          </text>
          <text x="190" y="100" textAnchor="middle" transform="rotate(90 190 100)" className="text-sm">
            Derinlik: {depth} cm
          </text>
        </svg>
      </div>
    </div>
  );
};