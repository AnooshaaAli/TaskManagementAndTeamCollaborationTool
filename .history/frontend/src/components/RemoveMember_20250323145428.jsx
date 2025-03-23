import React, { useState } from "react";
import "../styles/add-member.css";
export const removeMemberFromTeam = async (searchInput, projectId) => {
    const response = await fetch("http://localhost:8080/api/team/remove-member", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchInput, projectId }),
    });

    return response.json();
};

const RemoveMemberFromTeam = ({ projectId }) => {
    const [searchInput, setSearchInput] = useState("");
    const [message, setMessage] = useState("");

    const handleRemoveMember = async (e) => {
        e.preventDefault();
        try {
            const response = await removeMemberFromTeam(searchInput, projectId);
            console.log("API Response:", response);
            setMessage(response.message || JSON.stringify(response));
        } catch (error) {
            setMessage("Error removing member.");
        }
    };

    return (
        <div className={styles.form-container}>
            <h3>Remove Member from Team</h3>
            <form onSubmit={handleRemoveMember}>
                <input
                    type="text"
                    placeholder="Enter username or email"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={styles.input-field}
                    required
                />
                <button type="submit" className={styles.button}>Remove</button>
            </form>
            {message && <p className={message.includes("Error") ? styles.error : styles.message}>{message}</p>}
        </div>
    );
};

export default RemoveMemberFromTeam;
