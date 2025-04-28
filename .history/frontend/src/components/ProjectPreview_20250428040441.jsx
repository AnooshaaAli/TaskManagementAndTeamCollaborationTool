import React from "react";
import { Folder, ArrowRight, Calendar, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ProjectPreview = ({ id, name, onSelect, description, dueDate}) => {
    
    description = description || "No description available";
    dueDate = dueDate || "No deadline";
    const [teamSize, setTeamSize] = useState(null);

    useEffect(() => {
        const fetchSize = async () => {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/team/get-team/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                handleTeamSizeChange(data.length);
            } else {
                console.error('Failed to fetch team members');
            }
        };

        fetchSize();
    }, [id]); 

    const handleTeamSizeChange = (size) => {
        setTeamSize(size); // Update the team size in the parent component
    };

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