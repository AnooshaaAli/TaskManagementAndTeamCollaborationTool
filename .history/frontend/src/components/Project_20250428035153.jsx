import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import ConfirmDialog from './ConfirmDialog.jsx';
import AddMember from './AddMemberModal.jsx';
import RemoveMember from './RemoveMemberModal.jsx';
import "../styles/project.css";
import "../styles/comments.css";
import { Folder, Loader, UserPlus, UserMinus, Users, MessageSquare, X, FileText, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import CreateComment from './CreateComment.jsx';
import Comment from './Comment.jsx';
import UploadFile from './UploadFile.jsx'
import FileItem from './FileItem.jsx';
import ViewTeam from './ViewTeam.jsx';

function Project({ id }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showRemoveMember, setShowRemoveMember] = useState(false);
    const [showDeleteProject, setShowDeleteProject] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isTeamLead, setIsTeamLead] = useState(false);
    const [activeTab, setActiveTab] = useState(null); // null means no sidebar is open
    const [isDeleting, setIsDeleting] = useState(false);
    const [teamSize, setTeamSize] = useState(null);

    const handleTeamSizeChange = (size) => {
        setTeamSize(size); // Update the team size in the parent component
    };

    const token = localStorage.getItem("jwtToken");

    // project data
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        fetch(`http://localhost:8080/projects/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
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
        console.log("current user id" + currentUserId);
        console.log("project id " + id);

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
                console.log("isTeamLead:", data);
                setIsTeamLead(data.isTeamLead);
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

    const toggleTab = (tabName) => {
        setActiveTab(currentTab => currentTab === tabName ? null : tabName);
    };

    const addFileToProject = (newFile) => {
        setProject(prev => ({
            ...prev,
            files: {
                ...prev.files,
                [newFile.fileID]: newFile
            }
        }));
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8080/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to delete project");

            setProject(null); // or whatever your delete handler is
        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setIsDeleting(false);
            setShowDeleteProject(false);
        }
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

    const commentCount = project.comments ? Object.values(project.comments).length : 0;

    return (
        <div className="project-wrapper">
            <div className="project-header">
                <div className="project-title">
                    <h2>{project.name}</h2>
                </div>

                <div className="tabs-container">
                    <button
                        className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
                        onClick={() => toggleTab('comments')}
                    >
                        <div className="comment-svg">
                            <MessageSquare size={16} />
                        </div>
                        <span className="tab-text">Comments</span>
                        {commentCount > 0 && (
                            <span className="tab-badge">{commentCount}</span>
                        )}
                    </button>
                
                    <button
                        className={`tab ${activeTab === 'files' ? 'active' : ''}`}
                        onClick={() => toggleTab('files')}
                    >
                        <div className="file-svg">
                            <FileText size={16} />
                        </div>
                        <span className="tab-text">Files</span>
                    </button>
                
                    <button
                        className={`tab ${activeTab === 'viewTeam' ? 'active' : ''}`}
                        onClick={() => toggleTab('viewTeam')}
                    >
                        <div className="team-svg">
                            <Users size={16} />
                        </div>
                        <span className="tab-text">View Team</span>
                    </button>
                
                    {isTeamLead && (
                        <>
                            <button
                                className="tab"
                                onClick={() => {
                                    if (!currentUserId) {
                                        console.warn("⚠️ Cannot add member, currentUserId is still null!");
                                        return;
                                    }
                                    setShowAddMember(true);
                                }}
                            >
                                <div className="user-add-svg">
                                    <UserPlus size={16} />
                                </div>
                                <span className="tab-text">Add Member</span>
                            </button>
                
                            <button
                                className="tab"
                                onClick={() => setShowRemoveMember(true)}
                            >
                                <div className="user-minus-svg">
                                    <UserMinus size={16} />
                                </div>
                                <span className="tab-text">Remove Member</span>
                            </button>
                
                            <button
                                className="tab"
                                onClick={() => setShowDeleteProject(true)}
                            >
                                <div className="user-minus-svg">
                                    <Trash2 size={16} />
                                </div>
                                <span className="tab-text">Delete Project</span>
                            </button>
                        </>
                    )}
                </div>            
            </div>

            <div className="project-info">
                <div className="info-item">
                    <Users size={16} />
                    <span>{teamSize || 0} members</span>
                </div>
            </div>

            <div className="project-content-wrapper">
                <div className={`project-board ${activeTab ? 'with-sidebar' : ''}`}>
                    {project.lists && Object.values(project.lists).map(list => (
                        <List
                            key={list.listID}
                            list={list}
                            onDelete={deleteListFromProject}
                            onUpdate={updateListInProject}
                            isTeamLead={isTeamLead}
                        />
                    ))}

                    <CreateList
                        projectID={id}
                        onListCreated={addListToProject}
                    />
                </div>

                {activeTab === 'comments' && (
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <h3>Comments</h3>
                            <Button
                                variant="ghost"
                                className="close-sidebar"
                                onClick={() => setActiveTab(null)}
                            >
                                <X size={12} />
                            </Button>
                        </div>

                        <div className="comment-list">
                            {commentCount > 0 ? (
                                Object.values(project.comments).map(comment => (
                                    <Comment key={comment.commentID} comment={comment} />
                                ))
                            ) : (
                                <div className="no-content">
                                    No comments yet. Be the first to add one!
                                </div>
                            )}
                        </div>

                        <div className="sidebar-footer">
                            <CreateComment
                                userID={currentUserId}
                                projectID={id}
                                onCommentCreated={addCommentToProject}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'files' && (
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <h3>Files</h3>
                            <Button
                                variant="ghost"
                                className="close-sidebar"
                                onClick={() => setActiveTab(null)}
                            >
                                <X size={12} />
                            </Button>
                        </div>

                        <div className="file-list">
                            {project.files && Object.values(project.files).length > 0 ? (
                                Object.values(project.files).map(file => (
                                    <FileItem key={file.fileID} file={file} />
                                ))
                            ) : (
                                <div className="no-content">
                                    No files uploaded yet.
                                </div>
                            )}
                        </div>

                        <div className="sidebar-footer">
                            <UploadFile projectID={id} onFileUploaded={addFileToProject} />
                        </div>
                    </div>
                )}

                {activeTab === 'viewTeam' && (
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <h3>Team</h3>
                            <Button
                                variant="ghost"
                                className="close-sidebar"
                                onClick={() => setActiveTab(null)}
                            >
                                <X size={12} />
                            </Button>
                        </div>
                
                        <ViewTeam projectId={id}  onTeamSizeChange={handleTeamSizeChange}/>
                
                    </div>
                )}

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

            {showDeleteProject && (
                <ConfirmDialog
                    title="Delete Project"
                    message="Are you sure you want to delete this project and all its lists and tasks? This action cannot be undone."
                    confirmLabel={isDeleting ? "Deleting..." : "Delete"}
                    confirmIcon={isDeleting ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    cancelLabel="Cancel"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteProject(false)}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}

export default Project;