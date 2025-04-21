import "../styles/file.css";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';

function UploadFile({ projectID, onFileUploaded }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus("idle");
            setMessage("");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus("error");
            setMessage("Please select a file first.");
            return;
        }

        setStatus("loading");
        setMessage("Uploading file...");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectID", projectID);

        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch("http://localhost:8080/files/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            });

            if (response.ok) {
                const newFile = await response.json(); // Assume server returns the uploaded file info
                setFile(null);
                setStatus("success");
                setMessage(`File uploaded successfully!`);
                
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                setTimeout(() => {
                    setMessage("");
                    setStatus("idle");
                }, 3000);
              
                onFileUploaded?.(newFile);
            } else {
                const errorText = await response.text();
                setStatus("error");
                setMessage(`Upload failed: ${errorText}`);
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred: " + error.message);
        }
    };

    const clearFile = () => {
        setFile(null);
        setMessage("");
        setStatus("idle");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="file-upload-container">
            <div className="file-upload-header">
                <h3>Upload File</h3>
                <p className="file-upload-subtitle">Add documents to this project</p>
            </div>
            
            <div className="file-upload-area">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="file-input"
                />
                
                <div className="file-upload-dropzone" onClick={triggerFileInput}>
                    {!file ? (
                        <>
                            <Upload size={32} className="upload-icon" />
                            <p>Click to browse or drag and drop files here</p>
                            <span className="file-upload-hint">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</span>
                        </>
                    ) : (
                        <div className="selected-file">
                            <div className="selected-file-info">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button className="clear-file-btn" onClick={clearFile}>
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="file-upload-actions">
                <button 
                    className={`upload-button ${status === 'loading' ? 'loading' : ''}`}
                    onClick={handleUpload}
                    disabled={status === 'loading' || !file}
                >
                    {status === 'loading' ? (
                        <span className="button-loader"></span>
                    ) : (
                        <>
                            <Upload size={16} />
                            Upload File
                        </>
                    )}
                </button>
            </div>

            {message && (
                <div className={`file-upload-message ${status}`}>
                    {status === 'success' && <Check size={16} />}
                    {status === 'error' && <AlertCircle size={16} />}
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default UploadFile;