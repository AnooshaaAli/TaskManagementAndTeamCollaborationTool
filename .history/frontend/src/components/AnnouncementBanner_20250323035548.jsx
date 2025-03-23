import React from 'react';

const AnnouncementBanner = ({ title, description }) => {
  return (
    <div className="bg-pink-600 rounded-lg p-4 flex justify-between items-center">
      <div className="flex">
        <div className="mr-6">
          <img src="/api/placeholder/80/80" alt="Announcement" className="h-16" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
      </div>
      <button className="bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded-lg text-sm">
        Get Started
      </button>
    </div>
  );
};

export default AnnouncementBanner;