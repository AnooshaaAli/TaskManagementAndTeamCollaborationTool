import React, { useState } from "react";
import { UserPlus } from 'lucide-react';

const AssignTask = ({ taskID, T }) => {
    const [username, setUsername] = useState(""); 
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const messageClass = message.includes("Error") || message.includes("not found") 
    ? "assign-msg error"
    : message ? "assign-msg success" : "assign-msg";

    const handleAssign = async () => {
        const token = localStorage.getItem("jwtToken");

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
