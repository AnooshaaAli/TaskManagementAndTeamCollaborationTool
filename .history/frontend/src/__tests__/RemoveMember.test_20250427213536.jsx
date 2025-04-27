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

describe('RemoveMemberFromTeam component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form with input and button', () => {
        render(<RemoveMemberFromTeam projectId={1} />);

        const input = screen.getByPlaceholderText("Enter Email or Username");
        const button = screen.getByRole("button", { name: /Remove/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should handle form submission and show success message when member is removed', async () => {
        const mockResponse = { message: 'Member removed successfully' };

        removeMemberFromTeam.mockResolvedValueOnce(mockResponse);

        render(<RemoveMemberFromTeam projectId={1} />);

        const input = screen.getByPlaceholderText(/Enter Email or Username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Remove/i));

        await waitFor(() => expect(screen.getByText('Member removed successfully')).toBeInTheDocument());
    });

    it('should show an error message if the API call fails', async () => {
        removeMemberFromTeam.mockRejectedValueOnce(new Error('Error removing member.'));

        render(<RemoveMemberFromTeam projectId={1} />);

        const input = screen.getByPlaceholderText(/Enter Email or Username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Remove/i));

        await waitFor(() => expect(screen.getByText('Error removing member.')).toBeInTheDocument());
    });
});
