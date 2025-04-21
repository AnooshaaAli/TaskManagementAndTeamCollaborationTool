import React, { useState, useEffect, useRef } from 'react';

function UploadFile({ projectID, onFileUploaded }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

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
                setMessage(`File uploaded successfully!`);
                setTimeout(() => setMessage(""), 3000);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;  // Clear the file input field
                }
                // Call the callback so parent can update state
                onFileUploaded?.(newFile);
            } else {
                const errorText = await response.text();
                setMessage(`Upload failed: ${errorText}`);
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
}

export default UploadFile;