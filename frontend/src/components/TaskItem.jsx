import React from "react";
//import "./TaskBoard.css"; // Import styles

const TaskItem = ({ task, onEdit, onDelete }) => {
    if (!task) {
        return <p>No task found</p>; // Handle missing task
      }
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Deadline: {task.deadline}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
