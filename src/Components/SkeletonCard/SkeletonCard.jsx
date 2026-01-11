import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-[2rem] overflow-hidden border border-base-300 shadow-sm animate-pulse">
    {/* Image area */}
    <div className="h-48 w-full bg-base-300" />
    <div className="p-6 space-y-4">
      {/* Title */}
      <div className="h-6 bg-base-300 rounded-md w-3/4" />
      {/* Route info */}
      <div className="h-4 bg-base-200 rounded-md w-1/2" />
      {/* Grid area */}
      <div className="grid grid-cols-2 gap-3 py-4 border-y border-base-200">
        <div className="h-8 bg-base-200 rounded-lg" />
        <div className="h-8 bg-base-200 rounded-lg" />
      </div>
      {/* Price area */}
      <div className="flex justify-between items-center">
        <div className="h-8 bg-base-300 rounded-md w-20" />
        <div className="h-6 bg-base-200 rounded-md w-16" />
      </div>
      {/* Button */}
      <div className="h-12 bg-base-300 rounded-xl w-full" />
    </div>
  </div>
);

export default SkeletonCard;