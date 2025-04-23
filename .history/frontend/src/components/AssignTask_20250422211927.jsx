import React, { useState } from "react";
import { UserPlus } from 'lucide-react';

const AssignTask = ({ taskID }) => {
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
        } catch (error) {
            setMessage("Error assigning task.");
        }
    };

    return (
        <div className="assign-task">
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="assign-input"
            />
            <button onClick={handleAssign} className="assign-btn">Assign</button>
            {message && <p className={messageClass}>{message}</p>}
        </div>
    );
};

export default AssignTask;
