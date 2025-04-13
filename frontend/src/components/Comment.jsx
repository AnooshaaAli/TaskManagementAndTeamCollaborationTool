import React from 'react'

function Comment({ comment }) {
    return (
        <div key={comment.commentID}>
            <p><strong>User {comment.userID}:</strong> {comment.value}</p>
        </div>
    )
}

export default Comment
