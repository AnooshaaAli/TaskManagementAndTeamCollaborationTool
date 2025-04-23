import React, { useState } from "react";
import ViewFile from "./ViewFile";

const FileItem = ({ file }) => {
    const { fileID, fileName } = file;
    const [showFile, setShowFile] = useState(false);

    const handleViewFile = () => {
        setShowFile(!showFile); // Toggle file preview visibility
    };

    return (
        <div className="file-item">
            <p>{fileName}</p>
            <button onClick={handleViewFile}>
                {showFile ? "Hide File" : "View File"}
            </button>
            {showFile && <ViewFile fileName={fileName} />} {/* Conditionally render ViewFile component */}
        </div>
    );
};

export default FileItem;
