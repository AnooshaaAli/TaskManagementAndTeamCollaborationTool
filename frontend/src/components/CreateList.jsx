import React, { useState } from 'react';

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
        <div>
            <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
            />
            <button onClick={handleCreateList}>Enter</button>
            <button onClick={() => { setShowInput(false); setListName(""); }}>✖</button>
        </div>
    ) : (
        <button onClick={() => setShowInput(true)}>Add List</button>
    );
}

export default CreateList;
