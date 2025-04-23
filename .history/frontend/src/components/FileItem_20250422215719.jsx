import React, { useState } from "react";
import ViewFile from "./ViewFile";
import { File, ChevronDown, ChevronUp, Eye, Download } from "lucide-react";

const FileItem = ({ file }) => {
    const { fileID, fileName } = file;
    const [showFile, setShowFile] = useState(false);

    // Determine file type icon and class
    const getFileTypeInfo = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        const fileTypes = {
            pdf: { icon: "pdf", class: "pdf-file" },
            doc: { icon: "doc", class: "word-file" },
            docx: { icon: "doc", class: "word-file" },
            xls: { icon: "xls", class: "excel-file" },
            xlsx: { icon: "xls", class: "excel-file" },
            jpg: { icon: "img", class: "image-file" },
            jpeg: { icon: "img", class: "image-file" },
            png: { icon: "img", class: "image-file" },
            txt: { icon: "txt", class: "text-file" }
        };
        
        return fileTypes[extension] || { icon: "file", class: "other-file" };
    };

    const fileTypeInfo = getFileTypeInfo(fileName);

    return (
        <div className="file-item">
            <div className="file-item-header">
                <div className="file-info">
                    <div className={`file-icon ${fileTypeInfo.class}`}>
                        <File size={18} />
                    </div>
                    <span className="file-name" title={fileName}>
                        {fileName}
                    </span>
                </div>
                <div className="file-actions">
                    <button 
                        className="file-action-btn" 
                        onClick={() => setShowFile(!showFile)}
                        aria-label={showFile ? "Hide file" : "View file"}
                    >
                        {showFile ? <ChevronUp size={16} /> : <Eye size={16} />}
                        <span>{showFile ? "Hide" : "View"}</span>
                    </button>
                </div>
            </div>
            
            {showFile && (
                <div className="file-preview-container">
                    <ViewFile fileName={fileName} />
                </div>
            )}
        </div>
    );
};

export default FileItem;