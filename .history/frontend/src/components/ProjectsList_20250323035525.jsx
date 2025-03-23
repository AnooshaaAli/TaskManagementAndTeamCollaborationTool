import React from 'react';
import { Square, Calendar, Mail, Layout } from 'lucide-react';

const ProjectsList = ({ projects }) => {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'square': return <Square className="h-5 w-5" />;
      case 'calendar': return <Calendar className="h-5 w-5" />;
      case 'mail': return <Mail className="h-5 w-5" />;
      case 'layout': return <Layout className="h-5 w-5" />;
      default: return <Square className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-gray-200 font-semibold">Open Projects</h2>
        <div className="text-sm text-gray-400">Your data status</div>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start">
            <div className={`p-2 rounded-lg ${project.color} text-white mr-3`}>
              {getIcon(project.icon)}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <div className="text-gray-200 font-medium">{project.title}</div>
                <div className="text-gray-400 text-sm">{project.time}</div>
              </div>
              <div className="text-gray-400 text-sm">{project.description}</div>
              <div className="text-gray-400 text-sm mt-1">
                {project.tasks} tasks, {project.issues} issues
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;