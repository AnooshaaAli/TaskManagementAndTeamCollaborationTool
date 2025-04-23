import React, { useState } from "react";
import { UserPlus, X } from 'lucide-react';

const AssignTask = ({ taskID, taskTitle }) => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAssign = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwtToken");
        setMessage("");

        try {
            // Make a call to the backend to fetch the memberID using the username
            const userResponse = await fetch(`http://localhost:8080/assign/getUserIdByUsername?username=${username}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const userData = await userResponse.json();
            console.log("User data:", userData);

            if (!userData || !userData.userID) {
                setMessage("User not found.");
                return;
            }

            const memberID = userData.userID;

            // Now, assign the task using the memberID
            const response = await fetch(`http://localhost:8080/assign?taskID=${taskID}&memberID=${memberID}`, {
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
                    <div className="modal-title-with-task">
                        <h3>Assign Task</h3>
                        <div className="task-title-display">
                            <span className="task-divider">→</span>
                            <span className="highlighted-task-title">{taskTitle}</span>
                        </div>
                    </div>
                    <button 
                        className="close-button" 
                        onClick={() => {
                            setIsModalOpen(false);
                            setMessage("");
                            setUsername("");
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>
                        
                        <div className="modal-body">
                            <form onSubmit={handleAssign}>
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
                                />
                                
                                <button type="submit" disabled={!username.trim()}>
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