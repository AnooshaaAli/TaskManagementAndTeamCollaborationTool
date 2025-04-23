import React, { useState, useEffect } from "react";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";

const ViewFile = ({ fileName }) => {
    const [fileContent, setFileContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to check if file is viewable inline
    const isViewableInline = (filename) => {
        const viewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'txt'];
        const extension = filename.split('.').pop().toLowerCase();
        return viewableExtensions.includes(extension);
    };

    useEffect(() => {
        const fetchFile = async () => {
            setLoading(true);
            const token = localStorage.getItem("jwtToken");

            try {
                const response = await fetch(`http://localhost:8080/files/view/${fileName}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("File not found or unable to fetch.");
                }

                const blob = await response.blob();
                const fileUrl = URL.createObjectURL(blob);
                setFileContent(fileUrl);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFile();
        
        // Clean up object URL on unmount
        return () => {
            if (fileContent) {
                URL.revokeObjectURL(fileContent);
            }
        };
    }, [fileName]);

    if (loading) {
        return (
            <div className="file-loading">
                <div className="loading-spinner"></div>
                <span>Loading file...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="file-error">
                <AlertCircle size={20} />
                <p>Error loading file: {error}</p>
            </div>
        );
    }

    const renderFilePreview = () => {
        const extension = fileName.split('.').pop().toLowerCase();
        
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            return (
                <div className="image-preview">
                    <img src={fileContent} alt={fileName} />
                </div>
            );
        } else if (extension === 'pdf') {
            return (
                <div className="pdf-preview">
                    <iframe 
                        src={`${fileContent}#view=FitH`} 
                        title={fileName}
                        width="100%" 
                        height="500px"
                    />
                </div>
            );
        } else if (extension === 'txt') {
            // For text files, we'd need to fetch as text
            return (
                <div className="text-preview">
                    <p>Text preview not available. Please download the file.</p>
                </div>
            );
        } else {
            return (
                <div className="no-preview">
                    <FileText size={48} />
                    <p>Preview not available for this file type</p>
                </div>
            );
        }
    };

    return (
        <div className="file-viewer">
            {isViewableInline(fileName) ? (
                <div className="file-preview">
                    {renderFilePreview()}
                </div>
            ) : (
                <div className="no-preview">
                    <FileText size={48} />
                    <p>Preview not available for this file type</p>
                </div>
            )}
            
            <div className="file-actions">
                <a 
                    href={fileContent} 
                    download={fileName}
                    className="download-btn"
                >
                    <Download size={16} />
                    <span>Download</span>
                </a>
                <a 
                    href={fileContent} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="open-btn"
                >
                    <ExternalLink size={16} />
                    <span>Open in New Tab</span>
                </a>
            </div>
        </div>
    );
};

export default ViewFile;