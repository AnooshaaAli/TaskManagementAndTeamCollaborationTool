
// import React from "react";

// const List = ({ listID, name, projectID }) => {
//     return (
//         <div>
//             <h2>{name} (ID: {listID})</h2>
//             <div>
//                 blah blah
//             </div>
//         </div>
//     );
// };

// export default List;
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx"; // Import TaskItem component

const List = ({ listID, name, projectID }) => {
    const [tasks, setTasks] = useState([]);  // State to store tasks
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/lists/${listID}/tasks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Tasks received:", data);
                setTasks(Object.values(data)); // Convert HashMap to array
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            });
    }, [listID]);

    return (
        <div>
            <h2>{name} (ID: {listID})</h2>
            
            {loading ? <p>Loading tasks...</p> : (
                <div>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <TaskItem key={task.taskID} task={task} onEdit={() => {}} onDelete={() => {}} />
                        ))
                    ) : (
                        <p>No tasks in this list.</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default List;
