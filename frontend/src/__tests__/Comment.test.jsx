import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Comment from '../components/Comment';
import { User } from 'lucide-react';

// Mock fetch
global.fetch = jest.fn();

describe('Comment Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.setItem('jwtToken', 'fake-token'); // Mock the token
    });

    it('renders the comment with user name and formatted date', async () => {
        const mockComment = {
            value: 'This is a test comment',
            createdAt: '2025-04-25T12:00:00Z',
            userID: '123',
        };

        // Mock the response for user info
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ username: 'TestUser' }),
        });

        render(<Comment comment={mockComment} />);

        // Check if the comment text is rendered
        expect(screen.getByText(mockComment.value)).toBeInTheDocument();

        // Check if the formatted date is rendered
        const formattedDate = new Date(mockComment.createdAt).toLocaleString();
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('fetches and displays user data correctly', async () => {
        const mockComment = {
            value: 'This is another test comment',
            createdAt: '2025-04-26T15:30:00Z',
            userID: '123',
        };

        // Mock the user data fetch
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ username: 'MockedUser' }),
        });

        render(<Comment comment={mockComment} />);

        // Wait for the fetch to be completed and user data to be displayed
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(screen.getByText('MockedUser')).toBeInTheDocument();
        });
    });

    it('displays default username when fetch fails', async () => {
        const mockComment = {
            value: 'Test comment with failed user fetch',
            createdAt: '2025-04-27T08:45:00Z',
            userID: '123',
        };

        // Mock a failed fetch
        fetch.mockRejectedValueOnce(new Error('Failed to fetch user'));

        render(<Comment comment={mockComment} />);

        // Wait for the error handling to complete
        await waitFor(() => {
            expect(screen.getByText('User')).toBeInTheDocument();
        });
    });
});
