import '@testing-library/jest-dom';

// DeleteList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DeleteList from '../components/DeleteList';
import { Trash2, Loader } from 'lucide-react';

// Mock fetch
global.fetch = jest.fn();

describe('DeleteList Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.setItem('jwtToken', 'fake-token');  // Mock the token
    });

    it('shows confirmation dialog when delete button is clicked', () => {
        render(<DeleteList listID="1" onDeleteSuccess={jest.fn()} />);
    
        // Click delete button to show the confirmation dialog
        fireEvent.click(screen.getByRole('button', { name: /Delete List/i }));
    
        // Expect confirmation dialog to be visible
        expect(screen.getByText(/Are you sure you want to delete this list/i)).toBeInTheDocument();
    
        // Use getAllByText to handle multiple "Delete" buttons
        const deleteButtons = screen.getAllByText(/Delete/i);
        expect(deleteButtons.length).toBeGreaterThan(1);  // Ensure multiple buttons exist
        expect(deleteButtons[1]).toBeInTheDocument();  // The second "Delete" should be the confirm button
    });
    
    it('hides confirmation dialog when cancel button is clicked', () => {
        render(<DeleteList listID="1" onDeleteSuccess={jest.fn()} />);

        // Click delete button to show the dialog
        fireEvent.click(screen.getByRole('button', { name: /Delete List/i }));

        // Click cancel button
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

        // Expect confirmation dialog to be hidden
        expect(screen.queryByText(/Are you sure you want to delete this list/i)).not.toBeInTheDocument();
    });

    it('deletes the list when confirm button is clicked and shows loading state', async () => {
        const onDeleteSuccessMock = jest.fn();
        fetch.mockResolvedValueOnce({ ok: true });

        render(<DeleteList listID="1" onDeleteSuccess={onDeleteSuccessMock} />);

        // Click delete button to show the confirmation dialog
        fireEvent.click(screen.getByRole('button', { name: /Delete List/i }));

        // Click the confirm button by selecting the second button in the confirmation dialog
        const confirmButton = screen.getAllByRole('button', { name: /Delete/i })[1];  // Confirm button is the second one
        fireEvent.click(confirmButton);

        // Expect loading spinner to be visible while deleting
        expect(screen.getByRole('button', { name: /Deleting.../i })).toBeInTheDocument();

        // Wait for the deletion process to complete
        await waitFor(() => {
            expect(onDeleteSuccessMock).toHaveBeenCalledWith('1');
        });

        // Confirm that the confirmation dialog is closed
        expect(screen.queryByText(/Are you sure you want to delete this list/i)).not.toBeInTheDocument();
    });


});
