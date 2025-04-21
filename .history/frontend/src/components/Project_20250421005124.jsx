import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import DeleteProject from './DeleteProject.jsx';
import AddMember from './AddMemberModal.jsx';
import RemoveMember from './RemoveMemberModal.jsx';
import "../styles/project.css";
import "../styles/comments.css";
import { Folder, Loader, UserPlus, UserMinus, Users } from 'lucide-react';
import Button from '../components/Button';
import CreateComment from './CreateComment.jsx';
import Comment from './Comment.jsx';
import UploadFile from './UploadFile.jsx'

function Project({ id }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showRemoveMember, setShowRemoveMember] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isTeamLead, setIsTeamLead] = useState(false);

    // project data
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        fetch(`http://localhost:8080/projects/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        })
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

    // user data
    useEffect(() => {
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
                console.log("✅ User Data Fetched:", userData);

                // Pass userData.userId immediately instead of relying on currentUserId
                setCurrentUserId(userData.userID);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    //check if this user is teamlead or not
    useEffect(() => {
        if (currentUserId == null) return; // Avoid making the call before userID is set

        const token = localStorage.getItem("jwtToken");

        fetch(`http://localhost:8080/projects/${id}/isTeamLead/${currentUserId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response for isTeamLead was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("isTeamLead:", data); // Expected: { isTeamLead: true/false }
                setIsTeamLead(data.isTeamLead); // You should use state here!
            })
            .catch(error => {
                console.error("Error while checking team lead:", error);
            });

    }, [currentUserId, id]);


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

    const addCommentToProject = (newComment) => {
        setProject(prev => ({
            ...prev,
            comments: {
                ...prev.comments,
                [newComment.commentID]: newComment // Add new comment keyed by its ID
            }
        }));
    };


    const updateListInProject = (updatedList) => {
        setProject(prev => ({
            ...prev,
            lists: {
                ...prev.lists,
                [updatedList.listID]: updatedList
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
                {isTeamLead && (
                    <div className="member-actions">
                        <Button
                            variant="outline"
                            className="member-button"
                            onClick={() => {
                                if (!currentUserId) {
                                    console.warn("⚠️ Cannot add member, currentUserId is still null!");
                                    return;
                                }
                                setShowAddMember(true);
                            }}
                        >
                            <UserPlus size={16} className="member-icon" />
                            <span>Add Member</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="member-button"
                            onClick={() => setShowRemoveMember(true)}
                        >
                            <UserMinus size={16} className="member-icon" />
                            <span>Remove Member</span>
                        </Button>
                    </div>
                )}
                {isTeamLead && (
                    <div className="project-actions">
                        <DeleteProject
                            projectID={id}
                            onDelete={() => {setProject(null);}}
                        />
                    </div>
                )}
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
                    projectID={id}
                    onListCreated={addListToProject}
                />

                <div className="comment-section">
                    <div className="comment-header">
                        <div className="list-title">
                            <h3>Comments</h3>
                            {project.comments && Object.values(project.comments).length > 0 && (
                                <span className="comment-count">{Object.values(project.comments).length}</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="comment-list">
                        {project.comments && Object.values(project.comments).length > 0 ? (
                            Object.values(project.comments).map(comment => (
                                <Comment key={comment.commentID} comment={comment} />
                            ))
                        ) : (
                            <div className="no-comments">
                                No comments yet. Be the first to add one!
                            </div>
                        )}
                    </div>
                    
                    <CreateComment userID={currentUserId} projectID={id} onCommentCreated={addCommentToProject} />
                </div>

                <UploadFile projectID={id} />
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