import React, { useState } from "react";

export const removeMemberFromTeam = async (searchInput, projectId) => {
    const response = await fetch("http://localhost:8080/api/team/remove-member", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, // Attach the token
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ searchInput, projectId }), // 🔄 Changed userId -> searchInput
    });

    return response.json();
};

const RemoveMemberFromTeam = ({ projectId }) => {
    const [searchInput, setSearchInput] = useState(""); // 🔄 Updated state
    const [message, setMessage] = useState("");

    const handleRemoveMember = async (e) => {
        e.preventDefault();
        try {
            const response = await removeMemberFromTeam(searchInput, projectId);
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
                    placeholder="Enter Email or Username" // 🔄 Updated placeholder
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                />
                <button type="submit">Remove</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveMemberFromTeam;
