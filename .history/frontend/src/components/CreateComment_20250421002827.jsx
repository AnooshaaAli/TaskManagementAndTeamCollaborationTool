import React, { useState } from 'react';
import { MessageSquarePlus, Send, X } from 'lucide-react';
import Button from '../components/Button';
import "../styles/comments.css";

function CreateComment({ userID, projectID, onCommentCreated }) {
    const [showInput, setShowInput] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleCreateComment = async () => {
        if (!commentValue.trim()) return; // Prevent empty submissions

        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:8080/comments`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ value: commentValue, projectID: projectID, userID: userID })
            });

            if (response.ok) {
                const newComment = await response.json();
                onCommentCreated(newComment);
                setShowInput(false);
                setCommentValue("");
            } else {
                console.error("Failed to create comment");
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return showInput ? (
        <div>
            <textarea
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Add comment"
            />
            <button onClick={handleCreateComment}>Post Comment</button>
            <button onClick={() => { setShowInput(false); setCommentValue(""); }}>✖</button>
        </div>
    ) : (
        <button onClick={() => setShowInput(true)}>Add Comment</button>
    );
}

export default CreateComment;
