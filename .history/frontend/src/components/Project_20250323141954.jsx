import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import DeleteProject from './DeleteProject.jsx';
import "../styles/project.css";
import { Folder, Loader, Plus, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

function Project({ id }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!project) {
        return <p>No project found</p>;
    }

    return (
        <div className="project-wrapper">
            <div className="project-header">
                <div className="project-title">
                    <Folder size={20} />
                    <h2>{project.name}</h2>
                </div>
                <DeleteProject 
                    projectID={id} 
                    onDelete={() => console.log("Project deleted!")} 
                />
            </div>
            
            <div className="project-board">
                {project.lists && Object.values(project.lists).map(list => (
                    <Card key={list.listID} className="list-card">
                        <List 
                            list={list} 
                            onUpdateList={updateListInProject} 
                            onDelete={deleteListFromProject} 
                        />
                    </Card>
                ))}

                <div className="create-list-wrapper">
                    <CreateList projectID={id} onListCreated={addListToProject} />
                </div>
            </div>
        </div>
    );
}

export default Project;