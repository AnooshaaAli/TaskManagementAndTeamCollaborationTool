import React, { useState } from "react";

export const addMemberToTeam = async (searchInput, currentUserId, projectId) => {
    const response = await fetch("http://localhost:8080/api/team/add-member", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchInput, currentUserId, projectId }),
    });

    return response.json();
};

const TeamMemberForm = ({ currentUserId, projectId }) => {
    const [searchInput, setSearchInput] = useState("");
    const [message, setMessage] = useState("");

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const response = await addMemberToTeam(searchInput, currentUserId, projectId);
            setMessage(response);
        } catch (error) {
            setMessage("Error adding member.");
        }
    };

    return (
        <div>
            <h3>Add Member to Team</h3>
            <form onSubmit={handleAddMember}>
                <input
                    type="text"
                    placeholder="Enter email or username"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TeamMemberForm;
