import React, { useState } from "react";
import "../styles/add-member.css";

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

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    } else {
        return await response.text();
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
        <div className={styles.form-container}>
            <h3>Add Member to Team</h3>
            <form onSubmit={handleAddMember}>
                <input
                    type="text"
                    placeholder="Enter username or email"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={styles.input-field}
                    required
                />
                <button type="submit" className={styles.button}>Add</button>
            </form>
            {message && <p className={message.includes("Error") ? styles.error : styles.message}>{message}</p>}
        </div>
    );
};

export default TeamMemberForm;
