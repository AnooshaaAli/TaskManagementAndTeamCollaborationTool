import React from "react";

const ProjectPreview = ({ id, name, onSelect }) => {
    return (
        <div>
            <h3>{name}</h3>
            <button onClick={() => onSelect(id)}>Open Project</button>
        </div>
    );
};

export default ProjectPreview;
