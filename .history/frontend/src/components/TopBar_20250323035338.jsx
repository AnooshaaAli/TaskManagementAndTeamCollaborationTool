import React from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="bg-gray-800 py-2 px-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center">
        <div className="text-xl font-bold text-gray-100">CORONA</div>
        <div className="ml-10 relative">
          <input
            type="text"
            placeholder="Search products"
            className="bg-gray-700 text-gray-200 rounded px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </button>
        <button className="text-gray-300 hover:text-white">
          <Bell className="h-6 w-6" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <User className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <img
            src="/api/placeholder/32/32" 
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2 text-gray-200">Henry Klein</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;