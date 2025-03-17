import React, { useState } from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  if (!task) {
      return <p>No task found</p>;
  }

  // Handle Save After Editing
  const handleSave = () => {
    const updatedTask = { ...task, title: editedTitle };
    onEdit(updatedTask); // Update state and database
    setIsEditing(false);
  };



  return (
      <div className="task-item">
          {isEditing ? (
              <input 
                  type="text" 
                  value={editedTitle} 
                  onChange={(e) => setEditedTitle(e.target.value)} 
              />
          ) : (
              <h3>{task.title}</h3>
          )}
          <p>Status: {task.status}</p>
          <p>Deadline: {task.deadline}</p>

          {isEditing ? (
              <button onClick={handleSave}>Save</button>
          ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button onClick={() => onDelete(task.taskID)}>Delete</button>
      </div>
  );
};

export default TaskItem;