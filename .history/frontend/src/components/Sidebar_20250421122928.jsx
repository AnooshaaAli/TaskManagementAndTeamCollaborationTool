import React, { useState } from "react";
import "../styles/file.css"

function UploadFile({ projectID }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

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
                const data = await response.json();
                setFile(null);
                setMessage(`File uploaded successfully!`);

                setTimeout(() => setMessage(""), 3000);
            } else {
                const errorText = await response.text();
                setMessage(`Upload failed: ${errorText}`);
            }
        } catch (error) {
            setMessage("An error occurred: " + error.message);
        }
    };

    return (
        <div className="file-container">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default UploadFile;
