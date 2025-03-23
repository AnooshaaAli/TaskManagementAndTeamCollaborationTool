
// Dashboard.jsx - Main dashboard page
import React from 'react';
import StatCard from '../components/StatCard';
import TransactionHistory from './components/TransactionHistory';
import ProjectsList from './components/ProjectsList';
import AnnouncementBanner from './components/AnnouncementBanner';

const Dashboard = () => {
  // Sample data
  const statCards = [
    { title: 'Potential growth', value: '$12.34', change: '+3.5%', isPositive: true },
    { title: 'Revenue current', value: '$17.34', change: '+11%', isPositive: true },
    { title: 'Daily Income', value: '$12.34', change: '-2.4%', isPositive: false },
    { title: 'Expense current', value: '$31.53', change: '+3.5%', isPositive: true },
  ];

  const projects = [
    { id: 1, title: 'Admin dashboard design', description: 'Broadcast web app mockup', icon: 'square', color: 'bg-blue-500', time: '15 minutes ago', tasks: 30, issues: 5 },
    { id: 2, title: 'Wordpress Development', description: 'Upload new design', icon: 'square', color: 'bg-green-500', time: '1 hour ago', tasks: 23, issues: 5 },
    { id: 3, title: 'Project meeting', description: 'New project discussion', icon: 'calendar', color: 'bg-purple-500', time: '35 minutes ago', tasks: 15, issues: 2 },
    { id: 4, title: 'Broadcast Mail', description: 'Sent release details to team', icon: 'mail', color: 'bg-red-500', time: '55 minutes ago', tasks: 35, issues: 7 },
    { id: 5, title: 'UI Design', description: 'New application planning', icon: 'layout', color: 'bg-yellow-500', time: '50 minutes ago', tasks: 27, issues: 4 },
  ];

  const transactions = [
    { id: 1, title: 'Transfer to Paypal', date: '07 Jan 2019, 09:12AM', amount: '$236' },
    { id: 2, title: 'Transfer to Stripe', date: '07 Jan 2019, 09:12AM', amount: '$593' },
  ];

  return (
    <div className="space-y-6">
      <AnnouncementBanner 
        title="New refreshing look" 
        description="Corona admin template now with a new facelift for enhanced legibility and aesthetics!"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionHistory transactions={transactions} />
        <ProjectsList projects={projects} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl text-gray-200 font-semibold mb-4">Revenue</h2>
          {/* Revenue chart would go here */}
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl text-gray-200 font-semibold mb-4">Sales</h2>
          {/* Sales chart would go here */}
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl text-gray-200 font-semibold mb-4">Purchase</h2>
          {/* Purchase chart would go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;