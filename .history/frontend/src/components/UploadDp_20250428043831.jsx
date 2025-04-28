import React, { useState } from 'react';

const UploadDp = ({ userID, onUpload, onCancel }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
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

    // Function to handle modal click to prevent closing when clicking inside modal
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    // Function to handle cancel button click specifically
    const handleCancelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onCancel();
    };

    return (
        <div className="upload-modal" onClick={handleCancelClick}>
            <div className="upload-modal-content" onClick={handleModalContentClick}>
                <h2 className="upload-title">Upload Profile Picture</h2>
                
                {previewUrl && (
                    <div className="preview-container">
                        <img src={previewUrl} alt="Preview" className="image-preview" />
                    </div>
                )}
                
                <div className="file-input-container">
                    <label htmlFor="file-upload" className="file-input-label">
                        {selectedFile ? selectedFile.name : 'Choose an image'}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="file-input"
                        accept="image/*"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="button-group">
                    <button 
                        onClick={handleCancelClick} 
                        className="cancel-btn"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleFileUpload} 
                        className="upload-btn" 
                        disabled={uploading || !selectedFile}
                    >
                        {uploading ? (
                            <span className="uploading-text">
                                <span className="spinner"></span> Uploading...
                            </span>
                        ) : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDp;