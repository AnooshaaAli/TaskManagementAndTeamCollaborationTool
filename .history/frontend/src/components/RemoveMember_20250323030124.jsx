import React, { useState } from "react";

export const removeMemberFromTeam = async (userId, projectId) => {
    const response = await fetch("http://localhost:8080/api/team/remove-member", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, projectId }),
    });

    return response.json();
};

const RemoveMemberFromTeam = ({ projectId }) => {
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");

    const handleRemoveMember = async (e) => {
        e.preventDefault();
        try {
            const response = await removeMemberFromTeam(userId, projectId);
            console.log("API Response:", response); // ✅ Debug API response
            setMessage(response.message || JSON.stringify(response));
        } catch (error) {
            setMessage("Error removing member.");
        }
    };

    return (
        <div>
            <h3>Remove Member from Team</h3>
            <form onSubmit={handleRemoveMember}>
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <button type="submit">Remove</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveMemberFromTeam;
