import React from 'react';
import { X } from 'lucide-react';
import Button from '../components/Button';
import '../styles/confirmDialog.css';

function ConfirmDialog({
    title = "Confirm Action",
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmIcon = null,
    cancelIcon = <X size={14} />,
    onConfirm,
    onCancel,
    isLoading = false
}) {
    // Close on background click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isLoading) {
            onCancel();
        }
    };

    return (
        <div className="confirm-dialog-backdrop" onClick={handleBackdropClick}>
            <div className="confirm-dialog-container">
                <div className="confirm-dialog-header">
                    <h3>{title}</h3>
                    <button 
                        className="confirm-dialog-close" 
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        <X size={16} />
                    </button>
                </div>
                
                <div className="confirm-dialog-content">
                    <p>{message}</p>
                </div>
                
                <div className="confirm-dialog-footer">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelIcon}
                        {cancelLabel}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {confirmIcon}
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;