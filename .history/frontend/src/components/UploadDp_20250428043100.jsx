import React, { useState } from 'react';

const UploadDp = ({ userID, onUpload, onCancel }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError(null);
        setSuccessMessage(null);
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
                onCancel(); // Close after upload if you want
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
        <div className="upload-modal">
            <div className="upload-modal-content">
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                    Upload Profile Picture
                </h2>

                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="upload-input"
                    accept="image/*"
                />

                <div className="upload-buttons">
                    <button 
                        onClick={handleFileUpload} 
                        className="upload-button" 
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button 
                        onClick={onCancel} 
                        className="cancel-button"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDp;