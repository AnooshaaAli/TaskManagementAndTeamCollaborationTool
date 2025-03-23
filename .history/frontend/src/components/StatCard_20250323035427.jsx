import React from 'react';
import { ChevronUp, ChevronDown, Square } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className={`text-sm flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
            {isPositive ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </div>
          <div className="text-gray-400 text-sm mt-1">{title}</div>
        </div>
        <div className={`p-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <Square className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;