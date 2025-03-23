import React, { useState } from 'react';
import { X, Check } from 'lucide-react'; // Import icons for cancel and save
import "../styles/buttonComponents.css"; // Ensure styles are in this file

function CreateList({ projectID, onListCreated }) {
    const [showInput, setShowInput] = useState(false);
    const [listName, setListName] = useState("");

    const handleCreateList = async () => {
        if (!listName.trim()) return; // Prevent empty lists

        const response = await fetch(`http://localhost:8080/lists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: listName, projectID })
        });

        if (response.ok) {
            const newList = await response.json();
            onListCreated(newList); // Update parent state, add this list there
            setShowInput(false);
            setListName("");
        } else {
            console.error("Failed to add list");
        }
    };

    return showInput ? (
        <div className="create-list-input">
            <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
                className="create-list-input-field"
            />
            <div className="create-list-buttons">
                <button className="create-list-save-btn" onClick={handleCreateList}>
                    <Check size={16} /> Save
                </button>
                <button className="create-list-cancel-btn" onClick={() => { setShowInput(false); setListName(""); }}>
                    <X size={16} /> Cancel
                </button>
            </div>
        </div>
    ) : (
        <button className="create-list-toggle-btn" onClick={() => setShowInput(true)}>
            + Add List
        </button>
    );
}

export default CreateList;
