import React from "react";
import { Folder, ArrowRight } from 'lucide-react';

const ProjectPreview = ({ id, name, onSelect }) => {
    return (
        <div className="project-preview">
            <h3>
                <Folder size={18} style={{ display: 'inline', marginRight: '8px' }} />
                {name}
            </h3>
            <div className="project-preview-actions">
                <button 
                    className="view-project-btn" 
                    onClick={() => onSelect(id)}
                >
                    View Project <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProjectPreview;