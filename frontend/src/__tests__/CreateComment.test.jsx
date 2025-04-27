import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CreateComment from '../components/CreateComment';
import { Send, X } from 'lucide-react';

// Mock fetch
global.fetch = jest.fn();

describe('CreateComment Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.setItem('jwtToken', 'fake-token');  // Mock the token
    });

    it('renders the comment input when the add comment button is clicked', () => {
        render(<CreateComment userID="1" projectID="1" onCommentCreated={jest.fn()} />);
        
        // Click the add comment button to show the input area
        fireEvent.click(screen.getByRole('button', { name: /Add Comment/i }));
        
        // Expect the textarea and post/cancel buttons to be in the document
        expect(screen.getByPlaceholderText(/Add your comment here.../i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Post/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    it('does not allow submitting an empty comment', async () => {
        render(<CreateComment userID="1" projectID="1" onCommentCreated={jest.fn()} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Add Comment/i }));
        
        // Try to submit an empty comment
        fireEvent.click(screen.getByRole('button', { name: /Post/i }));
        
        // Expect the fetch function to not be called due to empty comment
        expect(fetch).not.toHaveBeenCalled();
    });

    it('submits the comment and calls onCommentCreated on success', async () => {
        const onCommentCreatedMock = jest.fn();
        fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, value: 'Test comment' }) });

        render(<CreateComment userID="1" projectID="1" onCommentCreated={onCommentCreatedMock} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Add Comment/i }));
        
        const commentTextArea = screen.getByPlaceholderText(/Add your comment here.../i);
        fireEvent.change(commentTextArea, { target: { value: 'Test comment' } });
        
        fireEvent.click(screen.getByRole('button', { name: /Post/i }));
        
        // Expect fetch to be called with the correct request
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/comments',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake-token',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    value: 'Test comment',
                    projectID: '1',
                    userID: '1'
                })
            })
        );
        
        // Expect the onCommentCreated mock to be called with the new comment
        await waitFor(() => {
            expect(onCommentCreatedMock).toHaveBeenCalledWith({ id: 1, value: 'Test comment' });
        });

        // Ensure input is cleared and comment input is hidden after submission
        expect(screen.queryByPlaceholderText(/Add your comment here.../i)).not.toBeInTheDocument();
    });    

    it('shows an error if comment creation fails', async () => {
        const onCommentCreatedMock = jest.fn();
        fetch.mockResolvedValueOnce({ ok: false });

        render(<CreateComment userID="1" projectID="1" onCommentCreated={onCommentCreatedMock} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Add Comment/i }));
        
        const commentTextArea = screen.getByPlaceholderText(/Add your comment here.../i);
        fireEvent.change(commentTextArea, { target: { value: 'Test comment' } });
        
        fireEvent.click(screen.getByRole('button', { name: /Post/i }));
        
        // Wait for fetch to resolve
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });

        // The onCommentCreated callback should not be called if the fetch fails
        expect(onCommentCreatedMock).not.toHaveBeenCalled();
    });

    it('cancels the comment input when the cancel button is clicked', () => {
        render(<CreateComment userID="1" projectID="1" onCommentCreated={jest.fn()} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Add Comment/i }));
        
        // Click the cancel button
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        
        // Expect the comment input to be hidden and the text area to be cleared
        expect(screen.queryByPlaceholderText(/Add your comment here.../i)).not.toBeInTheDocument();
    });
});
