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
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                <h2>Upload Profile Picture</h2>

                {error && <div style={styles.error}>{error}</div>}
                {successMessage && <div style={styles.success}>{successMessage}</div>}

                <input
                    type="file"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                />
                <div style={styles.buttons}>
                    <button
                        onClick={handleFileUpload}
                        style={styles.uploadButton}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                        onClick={onCancel}
                        style={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDp;
