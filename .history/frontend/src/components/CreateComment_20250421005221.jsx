import React, { useState } from 'react';
import { MessageSquarePlus, Send, X } from 'lucide-react';
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCreateComment();
        }
    };

    return (
        <div className="create-comment-container">
            {showInput ? (
                <div className="comment-input-area">
                    <div className="comment-input-group">
                        <textarea
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add your comment here..."
                            className="comment-textarea"
                            rows={3}
                        />
                    </div>
                    <div className="comment-actions">
                        <button 
                            onClick={handleCreateComment} 
                            disabled={isSubmitting || !commentValue.trim()}
                            className="post-comment-btn"
                        >
                            <Send size={16} />
                            <span>Post</span>
                        </button>
                        <button 
                            onClick={() => { setShowInput(false); setCommentValue(""); }}
                            className="cancel-comment-btn"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setShowInput(true)}
                    className="add-comment-btn"
                >
                    <span>Add Comment</span>
                </button>
            )}
        </div>
    );
}

export default CreateComment;

