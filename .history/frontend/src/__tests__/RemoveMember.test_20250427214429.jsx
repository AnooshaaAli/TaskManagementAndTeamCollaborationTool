import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RemoveMemberFromTeam, { removeMemberFromTeam } from '../components/RemoveMember'; 

global.fetch = jest.fn();

describe('removeMemberFromTeam function', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.clear();
    });

    it('should successfully remove a member when response is OK and JSON', async () => {
        const mockResponse = { message: 'Member removed successfully' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
            headers: { get: () => 'application/json' },
        });

        localStorage.setItem('jwtToken', 'dummy_token');

        const result = await removeMemberFromTeam('testUser', 1);

        expect(result).toEqual(mockResponse);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/team/remove-member",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Authorization": "Bearer dummy_token",
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    searchInput: 'testUser',
                    projectId: 1,
                }),
            })
        );
    });

    it('should handle errors if the response is not OK', async () => {
        // Mock a failed fetch response with a non-JSON response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            json: async () => ({ message: 'Failed to remove member' }),  // Ensure json() exists
            headers: { get: () => 'application/json' },
        });

        await expect(removeMemberFromTeam('testUser', 1)).rejects.toThrow('Failed to remove member');
    });
});
