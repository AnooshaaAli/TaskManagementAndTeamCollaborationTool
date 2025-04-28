import React, { useState } from 'react';

const UploadDp = ({ userID, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError(null); // Reset error if file is selected
        setSuccessMessage(null); // Reset success message
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const token = localStorage.getItem("jwtToken");

        try {
            setUploading(true);
            const response = await fetch(`http://localhost:8080/files/uploadDp?accountID=${userID}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('File uploaded successfully!');
                setUploading(false);
                const result = await response.json();
                console.log(result);
                onUpload();
            } else {
                const errorText = await response.text();
                setError(errorText || 'File upload failed');
                setUploading(false);
            }
        } catch (err) {
            setError('Error uploading file: ' + err.message);
            setUploading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload Profile Picture</h2>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <input type="file" onChange={handleFileChange} />
            <button
                onClick={handleFileUpload}
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadDp;
