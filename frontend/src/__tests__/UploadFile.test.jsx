import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadFile from '../components/UploadFile';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

// Mock fetch
global.fetch = jest.fn();

describe('UploadFile Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.setItem('jwtToken', 'fake-token'); // Mock the token
    });

    it('renders the upload area correctly', () => {
        render(<UploadFile projectID="1" onFileUploaded={jest.fn()} />);

        // Check if the upload area is present
        expect(screen.getByText(/Click to browse or drag and drop files here/i)).toBeInTheDocument();
        expect(screen.getByText(/Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG/i)).toBeInTheDocument();
    });

    it('allows selecting a file', () => {
        render(<UploadFile projectID="1" onFileUploaded={jest.fn()} />);
    
        const fileInput = screen.getByLabelText(/file input/i); // Ensure this is properly associated with the input
        const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
    
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        // Check if the selected file name is displayed
        expect(screen.getByText(/test.pdf/i)).toBeInTheDocument();
    });
    
    it('uploads the file successfully and calls onFileUploaded', async () => {
        const onFileUploadedMock = jest.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: 'test.pdf', size: 1024 }),
        });

        render(<UploadFile projectID="1" onFileUploaded={onFileUploadedMock} />);

        const fileInput = screen.getByLabelText(/file input/i);
        const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Simulate file upload
        fireEvent.click(screen.getByRole('button', { name: /Upload File/i }));

        // Check if the fetch request was made
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/files/upload',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    Authorization: 'Bearer fake-token',
                }),
            })
        );

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText(/File uploaded successfully!/i)).toBeInTheDocument();
        });

        // Check if the onFileUploaded mock was called
        expect(onFileUploadedMock).toHaveBeenCalledWith({
            id: 1,
            name: 'test.pdf',
            size: 1024,
        });
    });

    it('shows an error if upload fails', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Upload failed',
        });

        render(<UploadFile projectID="1" onFileUploaded={jest.fn()} />);

        const fileInput = screen.getByLabelText(/file input/i);
        const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // Simulate file upload
        fireEvent.click(screen.getByRole('button', { name: /Upload File/i }));

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(/Upload failed: Upload failed/i)).toBeInTheDocument();
        });
    });

   
});
