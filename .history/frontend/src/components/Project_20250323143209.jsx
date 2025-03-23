import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import DeleteProject from './DeleteProject.jsx';
import AddMember from './AddMember.jsx';
import RemoveMember from './RemoveMember.jsx';
import "../styles/project.css";
import { Folder, Loader, Plus, Trash2, UserPlus, UserMinus, Users } from 'lucide-react';
import Button from '../components/Button';

function Project({ id }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showRemoveMember, setShowRemoveMember] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    // Fetch project data
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/projects/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                return response.json();
            })
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching project:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }
    
                const response = await fetch("http://localhost:8080/auth/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
    
                const userData = await response.json();
                setCurrentUserId(userData.userId);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Ensure loading is set to false even if an error occurs
            }
        };
    
        fetchUserData();
    }, []);    

    const addListToProject = (newList) => {
        setProject(prev => ({
            ...prev,
            lists: { ...prev.lists, [newList.listID]: newList }
        }));
    };

    const deleteListFromProject = (listID) => {
        setProject(prev => ({
            ...prev,
            lists: Object.fromEntries(
                Object.entries(prev.lists).filter(([key]) => key !== String(listID))
            )
        }));
    };

    // Function to update a specific list inside project.lists
    const updateListInProject = (updatedList) => {
        setProject(prev => ({
            ...prev,
            lists: {
                ...prev.lists,
                [updatedList.listID]: updatedList // Only update the modified list
            }
        }));
    };

    if (loading) {
        return (
            <div className="project-loading">
                <Loader size={24} className="animate-spin" />
                <p>Loading project...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="project-error">
                <p>Error: {error}</p>
                <Button onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!project) {
        return <div>No project found</div>;
    }

    return (
        <div className="project-wrapper">
            <div className="project-header">
                <div className="project-title">
                    <Folder size={24} />
                    <h2>{project.name}</h2>
                </div>
                <div className="project-actions">
                    <Button 
                        variant="secondary" 
                        className="member-button"
                        onClick={() => setShowAddMember(true)}
                    >
                        <UserPlus size={18} />
                        <span>Add Member</span>
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="member-button"
                        onClick={() => setShowRemoveMember(true)}
                    >
                        <UserMinus size={18} />
                        <span>Remove Member</span>
                    </Button>
                    <DeleteProject 
                        projectId={id} 
                        onDelete={() => console.log("Project deleted!")} 
                    />
                </div>
            </div>
            
            <div className="project-info">
                <div className="info-item">
                    <Users size={16} />
                    <span>{project.teamSize || project.members?.length || 0} members</span>
                </div>
            </div>

            <div className="project-board">
                {project.lists && Object.values(project.lists).map(list => (
                    <List 
                        key={list.listID} 
                        list={list} 
                        onDelete={deleteListFromProject} 
                        onUpdate={updateListInProject} 
                    />
                ))}

                <CreateList 
                    projectId={id} 
                    onListCreated={addListToProject} 
                />
            </div>

            {showAddMember && (
                <AddMember 
                    projectId={id}
                    currentUserId={currentUserId}
                    onClose={() => setShowAddMember(false)}
                />
            )}

            {showRemoveMember && (
                <RemoveMember 
                    projectId={id}
                    onClose={() => setShowRemoveMember(false)}
                />
            )}
        </div>
    );
}

export default Project;