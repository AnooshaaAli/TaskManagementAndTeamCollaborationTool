import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import "../styles/comments.css";

function Comment({ comment }) {
    const [userName, setUserName] = useState("User");
    const [formattedDate, setFormattedDate] = useState("");
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        // Format the date
        if (comment.createdAt) {
            const date = new Date(comment.createdAt);
            setFormattedDate(date.toLocaleString());
        }
        
        // Fetch user info if needed
        if (comment.userID) {
            fetchUserInfo(comment.userID);
        }
    }, [comment]);

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch("http://localhost:8080/auth/user", {
                headers: { Authorization: `Bearer ${token}` }
              });
            
            if (response.ok) {
                const userData = await response.json();
                setUserName(userData.username || userData.username || "User");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <div className="comment-item">
            <div className="comment-item-header">
                <div className="comment-author">
                    <User size={14} className="user-icon"/>
                    <span className=>{userName}</span>
                </div>
                <div className="comment-time">
                    <span>{formattedDate}</span>
                </div>
            </div>
            <div className="comment-content">
                {comment.value}
            </div>
        </div>
    );
}

export default Comment;