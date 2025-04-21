import React, { useState } from "react";
import "../styles/f"

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
                    Authorization: `Bearer ${token}`, // Don't add Content-Type here, fetch sets it for FormData automatically
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
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default UploadFile;
