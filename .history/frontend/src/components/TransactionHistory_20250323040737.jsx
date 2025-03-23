import React from 'react';

const TransactionHistory = ({ transactions }) => {
  // Sample donut chart data
  const total = 1200;
  
  return (
    <div className="transaction-history">
      <h2 className="section-title">Transaction History</h2>
      
      <div className="transaction-chart">
        <div className="donut-chart">
          {/* This would be a proper chart in a real app */}
          <div className="donut-chart-center">
            <div className="donut-chart-value">${total}</div>
            <div className="donut-chart-label">Total</div>
          </div>
        </div>
      </div>
      
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-title">{transaction.title}</div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <div className="transaction-amount">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;