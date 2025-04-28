import React, { useState, useEffect } from "react";
import { UserPlus, X } from 'lucide-react';

const AssignTask = ({ taskID, taskTitle, projectId }) => {
    const [username, setUsername] = useState("");  // Now this is for handling the selected username
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]); // Store team members here
    const [selectedMemberId, setSelectedMemberId] = useState(""); // Store selected member's ID

    const fetchTeamMembers = async () => {
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(`http://localhost:8080/api/team/get-team/${projectId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch team members");
            }

            const data = await response.json();
            setTeamMembers(data); // Set the team members to state
        } catch (error) {
            console.error("Error fetching team members:", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchTeamMembers();  // Fetch team members only when modal is open
        }
    }, [isModalOpen, projectId]);

    const handleAssign = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwtToken");
        setMessage("");

        try {
            if (!selectedMemberId) {
                setMessage("Please select a member.");
                return;
            }

            // Assign the task using the selected member's ID
            const response = await fetch(`http://localhost:8080/assign?taskID=${taskID}&memberID=${selectedMemberId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.text();
            setMessage(result);

            // Close modal on success after a short delay
            if (!result.includes("Error") && !result.includes("not found")) {
                setTimeout(() => {
                    setIsModalOpen(false);
                    setUsername("");
                    setMessage("");
                }, 2000);
            }
        } catch (error) {
            setMessage("Error assigning task.");
        }
    };

    return (
        <>
            <button 
                className="task-action-btn assign" 
                onClick={() => setIsModalOpen(true)}
                title="Assign task"
            >
                <UserPlus size={14} />
            </button>
            
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            <h3>Assign Task</h3>
                            <span className="task-title-badge">{taskTitle}</span>
                        </div>
                        <button 
                            className="close-button" 
                            onClick={() => {
                                setIsModalOpen(false);
                                setMessage("");
                                setUsername("");
                                setSelectedMemberId(""); // Clear selected member ID when modal closes
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                        
                        <div className="modal-body">
                            <form onSubmit={handleAssign}>
                                <select
                                    value={selectedMemberId}
                                    onChange={(e) => setSelectedMemberId(e.target.value)}
                                >
                                    <option value="">Select a Team Member</option>
                                    {teamMembers.map((member) => (
                                        <option key={member.userID} value={member.userID}>
                                            {member.username}
                                        </option>
                                    ))}
                                </select>
                                
                                <button type="submit" disabled={!selectedMemberId}>
                                    Assign
                                </button>
                            </form>
                            
                            {message && <p className={message.includes("Error") || message.includes("not found") ? "error-message" : "success-message"}>
                                {message}
                            </p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssignTask;
