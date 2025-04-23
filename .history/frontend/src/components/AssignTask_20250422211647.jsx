import React, { useState } from "react";
import { UserPlus } from 'lucide-react';

const AssignTask = ({ taskID, taskTitle }) => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAssign = async () => {
        // Your existing assignment logic
        const token = localStorage.getItem("jwtToken");
        try {
            // API calls as before
            
            // Close modal on success
            setTimeout(() => {
                if (!message.includes("Error") && !message.includes("not found")) {
                    setIsModalOpen(false);
                    setUsername("");
                }
            }, 2000);
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
                <div className="modal-backdrop">
                    <div className="assign-modal">
                        <h3>Assign Task</h3>
                        <p className="modal-task-title">{taskTitle}</p>
                        
                        <div className="modal-content">
                            <input
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="assign-input"
                                autoFocus
                            />
                            
                            {message && (
                                <p className={`assign-msg ${
                                    message.includes("Error") || message.includes("not found") 
                                    ? "error" : "success"
                                }`}>
                                    {message}
                                </p>
                            )}
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="cancel-btn" 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setMessage("");
                                    setUsername("");
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="assign-btn" 
                                onClick={handleAssign}
                                disabled={!username.trim()}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssignTask;