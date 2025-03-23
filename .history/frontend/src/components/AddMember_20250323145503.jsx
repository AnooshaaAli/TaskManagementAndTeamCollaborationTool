import React, { useState } from "react";
import "../styles/delete-project.css";
export const addMemberToTeam = async (searchInput, currentUserId, projectId) => {
    const response = await fetch("http://localhost:8080/api/team/add-member", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchInput, currentUserId, projectId }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Check if response is JSON or plain text
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();  // Parse JSON if available
    } else {
        return await response.text();  // Handle plain text response
    }
};

const TeamMemberForm = ({ currentUserId, projectId }) => {
    const [searchInput, setSearchInput] = useState("");
    const [message, setMessage] = useState("");

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const response = await addMemberToTeam(searchInput, currentUserId, projectId);
            console.log("API Response:", response);
            setMessage(typeof response === "string" ? response : response.message);
        } catch (error) {
            console.error("API Error:", error);
            setMessage(error.message || "Error adding member.");
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
