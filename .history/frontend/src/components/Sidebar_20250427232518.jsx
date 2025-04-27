import { useState } from 'react';
import { PieChart, ListTodo, Folder, Calendar } from 'lucide-react';

export default function SidebarWithCalendar() {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const handleNavigation = (section) => {
    setActiveSection(section);
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="sidebar-nav w-64 bg-gray-100 p-4 border-r border-gray-200">
        <ul className="space-y-4">
          <li 
            className={`flex items-center p-2 rounded-lg ${activeSection === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            onClick={() => handleNavigation('dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <PieChart size={20} className="mr-2" />
            <span>Dashboard</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg ${activeSection === 'tasks' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            onClick={() => handleNavigation('tasks')}
            style={{ cursor: 'pointer' }}
          >
            <ListTodo size={20} className="mr-2" />
            <span>My Tasks</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg ${activeSection === 'projects' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            onClick={() => handleNavigation('projects')}
            style={{ cursor: 'pointer' }}
          >
            <Folder size={20} className="mr-2" />
            <span>Projects</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-lg ${activeSection === 'calendar' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            onClick={() => handleNavigation('calendar')}
            style={{ cursor: 'pointer' }}
          >
            <Calendar size={20} className="mr-2" />
            <span>Calendar</span>
          </li>
        </ul>
      </nav>
      
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeSection === 'dashboard' && (
          <div className="text-xl font-bold">Dashboard Content</div>
        )}
        {activeSection === 'tasks' && (
          <div className="text-xl font-bold">My Tasks Content</div>
        )}
        {activeSection === 'projects' && (
          <div className="text-xl font-bold">Projects Content</div>
        )}
        {activeSection === 'calendar' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <CalendarComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const calendar = [];
  let day = 1;
  
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(null);
      } else if (day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
        day++;
      }
    }
    calendar.push(week);
    if (day > daysInMonth) break;
  }
  
  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };
  
  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-100">
          &lt;
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-100">
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
        
        {calendar.map((week, weekIndex) => (
          week.map((day, dayIndex) => (
            <div 
              key={`${weekIndex}-${dayIndex}`}
              className={`
                h-12 text-center py-2 border border-gray-200
                ${day ? 'hover:bg-gray-100' : 'bg-gray-50'} 
                ${isToday(day) ? 'bg-blue-100 text-blue-600 font-bold' : ''}
              `}
            >
              {day}
            </div>
          ))
        ))}
      </div>
    </div>
  );
}