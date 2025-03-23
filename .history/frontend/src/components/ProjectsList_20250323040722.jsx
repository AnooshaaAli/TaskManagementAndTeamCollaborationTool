import React from 'react';

const ProjectsList = ({ projects }) => {
  const getIconClass = (iconName) => {
    switch(iconName) {
      case 'square': return 'icon-square';
      case 'calendar': return 'icon-calendar';
      case 'mail': return 'icon-mail';
      case 'layout': return 'icon-layout';
      default: return 'icon-square';
    }
  };

  return (
    <div className="projects-list">
      <div className="projects-header">
        <h2 className="section-title">Open Projects</h2>
        <div className="projects-status">Your data status</div>
      </div>
      
      <div className="projects-items">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className={`project-icon ${project.color}`}>
              <span className={getIconClass(project.icon)}></span>
            </div>
            <div className="project-details">
              <div className="project-header">
                <div className="project-title">{project.title}</div>
                <div className="project-time">{project.time}</div>
              </div>
              <div className="project-description">{project.description}</div>
              <div className="project-stats">
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