import React from "react";
import { Folder, ArrowRight, Calendar, Users } from 'lucide-react';

const ProjectPreview = ({ id, name, onSelect, description, dueDate}) => {
    
    description = description || "No description available";
    dueDate = dueDate || "No deadline";
    teamSize = teamSize || 1;
    
    return (
        <div className="project-card" onClick={() => onSelect(id)}>
            <div className="project-card-header">
                <Folder size={20} className="project-icon" />
                <h3 className="project-title">{name}</h3>
            </div>
            
            <p className="project-description">{description}</p>
            
            <div className="project-meta">
                <div className="project-meta-item">
                    <Calendar size={14} />
                    <span>{dueDate}</span>
                </div>
                <div className="project-meta-item">
                    <Users size={14} />
                    <span>{teamSize} members</span>
                </div>
            </div>
            
            <div className="project-card-footer">
                <button className="view-project-btn">
                    View Details <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default ProjectPreview;