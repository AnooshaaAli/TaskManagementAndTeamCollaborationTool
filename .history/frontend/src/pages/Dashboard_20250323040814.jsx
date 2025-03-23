// Dashboard.jsx - Main dashboard page
import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Logo from '../components/Logo';
import "../styles/styles.css";
import StatCard from '../components/StatCard';
import TransactionHistory from '../components/TransactionHistory';
import ProjectsList from '../components/ProjectsList';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const Dashboard = () => {
  // Sample data
  const statCards = [
    { title: 'Potential growth', value: '$12.34', change: '+3.5%', isPositive: true },
    { title: 'Revenue current', value: '$17.34', change: '+11%', isPositive: true },
    { title: 'Daily Income', value: '$12.34', change: '-2.4%', isPositive: false },
    { title: 'Expense current', value: '$31.53', change: '+3.5%', isPositive: true },
  ];

  const projects = [
    { id: 1, title: 'Admin dashboard design', description: 'Broadcast web app mockup', icon: 'square', color: 'blue', time: '15 minutes ago', tasks: 30, issues: 5 },
    { id: 2, title: 'Wordpress Development', description: 'Upload new design', icon: 'square', color: 'green', time: '1 hour ago', tasks: 23, issues: 5 },
    { id: 3, title: 'Project meeting', description: 'New project discussion', icon: 'calendar', color: 'purple', time: '35 minutes ago', tasks: 15, issues: 2 },
    { id: 4, title: 'Broadcast Mail', description: 'Sent release details to team', icon: 'mail', color: 'red', time: '55 minutes ago', tasks: 35, issues: 7 },
    { id: 5, title: 'UI Design', description: 'New application planning', icon: 'layout', color: 'yellow', time: '50 minutes ago', tasks: 27, issues: 4 },
  ];

  const transactions = [
    { id: 1, title: 'Transfer to Paypal', date: '07 Jan 2019, 09:12AM', amount: '$236' },
    { id: 2, title: 'Transfer to Stripe', date: '07 Jan 2019, 09:12AM', amount: '$593' },
  ];

  return (
    <div className="dashboard-container dark-theme">
      <Sidebar />
      <div className="dashboard-content">
        <TopBar />
        <main className="dashboard-main">
          <AnnouncementBanner 
            title="New refreshing look" 
            description="Corona admin template now with a new facelift for enhanced legibility and aesthetics!"
          />
          
          <div className="stat-cards-grid">
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

          <div className="dashboard-widgets-grid">
            <Card className="dashboard-card">
              <TransactionHistory transactions={transactions} />
            </Card>
            <Card className="dashboard-card">
              <ProjectsList projects={projects} />
            </Card>
          </div>

          <div className="dashboard-charts-grid">
            <Card className="dashboard-card">
              <h2 className="card-title">Revenue</h2>
              {/* Revenue chart would go here */}
            </Card>
            <Card className="dashboard-card">
              <h2 className="card-title">Sales</h2>
              {/* Sales chart would go here */}
            </Card>
            <Card className="dashboard-card">
              <h2 className="card-title">Purchase</h2>
              {/* Purchase chart would go here */}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;