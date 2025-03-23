import React from 'react';
import { 
  LayoutDashboard, 
  Widgets, 
  Layers, 
  Sidebar as SidebarIcon, 
  Box, 
  Sliders, 
  FileType, 
  Table, 
  Edit, 
  BarChart2, 
  Map, 
  Bell, 
  Icons
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { title: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, active: true },
    { title: 'Widgets', icon: <Widgets className="h-5 w-5" /> },
    { title: 'Page Layouts', icon: <Layers className="h-5 w-5" /> },
    { title: 'Sidebar Layouts', icon: <SidebarIcon className="h-5 w-5" /> },
    { title: 'Basic UI Elements', icon: <Box className="h-5 w-5" /> },
    { title: 'Advanced Elements', icon: <Sliders className="h-5 w-5" /> },
    { title: 'Form Elements', icon: <FileType className="h-5 w-5" /> },
    { title: 'Tables', icon: <Table className="h-5 w-5" /> },
    { title: 'Editors', icon: <Edit className="h-5 w-5" /> },
    { title: 'Charts', icon: <BarChart2 className="h-5 w-5" /> },
    { title: 'Maps', icon: <Map className="h-5 w-5" /> },
    { title: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { title: 'Icons', icon: <Icons className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <img
          src="/api/placeholder/40/40" 
          alt="User"
          className="h-10 w-10 rounded-full" 
        />
        <div className="ml-3">
          <p className="text-white font-semibold">Henry Klein</p>
          <p className="text-xs text-gray-400">Gold Member</p>
        </div>
      </div>
      
      <div className="px-4 py-2 text-gray-400 text-sm">Navigation</div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center px-4 py-3 text-sm ${
                  item.active 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-4 py-2 text-gray-400 text-sm">More</div>
    </div>
  );
};

export default Sidebar;