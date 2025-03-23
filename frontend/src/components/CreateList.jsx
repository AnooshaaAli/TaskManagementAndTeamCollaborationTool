import React, { useState } from 'react';
import { X, Check, Plus, Loader } from 'lucide-react';
import Button from '../components/Button';
import "../styles/list.css";
import "../styles/create-list.css";

function CreateList({ projectID, onListCreated }) {
    const [showInput, setShowInput] = useState(false);
    const [listName, setListName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleCreateList = async () => {
        if (!listName.trim()) return; 

        setIsCreating(true);
        try {
            const response = await fetch(`http://localhost:8080/lists`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: listName, projectID })
            });

            if (!response.ok) {
                throw new Error("Failed to create list");
            }

            const newList = await response.json();
            onListCreated(newList); 
            setShowInput(false);
            setListName("");
        } catch (error) {
            console.error("Error creating list:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && listName.trim()) {
            handleCreateList();
        } else if (e.key === 'Escape') {
            setShowInput(false);
            setListName("");
        }
    };

    return (
        <div className="list-container create-list-container">
            {showInput ? (
                <>
                    <div className="new-task-form">
                        <div className="form-inputs">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter list name"
                                    className="task-input"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="button-group">
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={handleCreateList} 
                                disabled={isCreating || !listName.trim()}
                            >
                                {isCreating ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                                Save
                            </Button>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={() => { setShowInput(false); setListName(""); }}
                            >
                                <X size={14} />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Button 
                    variant="outline" 
                    size="md" 
                    className="create-list-button" 
                    onClick={() => setShowInput(true)}
                >
                    <Plus size={14} />
                    Add List
                </Button>
            )}
        </div>
    );
}

export default CreateList;