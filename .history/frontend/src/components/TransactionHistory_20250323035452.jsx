import React from 'react';

const TransactionHistory = ({ transactions }) => {
  // Sample donut chart data
  const total = 1200;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl text-gray-200 font-semibold mb-6">Transaction History</h2>
      
      <div className="flex justify-center mb-6">
        <div className="relative h-40 w-40">
          {/* This would be a proper chart in a real app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">${total}</div>
              <div className="text-gray-400 text-sm">Total</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-700/50 p-3 rounded-lg flex justify-between">
            <div>
              <div className="text-gray-200">{transaction.title}</div>
              <div className="text-gray-400 text-sm">{transaction.date}</div>
            </div>
            <div className="text-gray-200 font-medium">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;