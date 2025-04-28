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

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(8px)',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    },
    fileInput: {
        marginTop: '20px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttons: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        width: '48%',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        width: '48%',
    },
    error: {
        color: '#e74c3c',
        marginTop: '10px',
    },
    success: {
        color: '#2ecc71',
        marginTop: '10px',
    },
};

export default UploadDp;
