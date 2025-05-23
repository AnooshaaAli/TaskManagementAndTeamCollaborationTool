import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RemoveMemberFromTeam, { removeMemberFromTeam } from '../components/RemoveMember';

jest.mock('../components/RemoveMember', () => ({
    ...jest.requireActual('../components/RemoveMember'),
    removeMemberFromTeam: jest.fn(),
}));

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

        // Mock the resolved value of removeMemberFromTeam
        removeMemberFromTeam.mockResolvedValueOnce(mockResponse);

        render(<RemoveMemberFromTeam projectId={1} />);

        const input = screen.getByPlaceholderText(/Enter Email or Username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Remove/i));

        // Wait for the success message to appear
        await waitFor(() => expect(screen.getByText('Member removed successfully')).toBeInTheDocument());
    });

    it('should show an error message if the API call fails', async () => {
        // Mock the rejection case
        removeMemberFromTeam.mockRejectedValueOnce(new Error('Error removing member.'));

        render(<RemoveMemberFromTeam projectId={1} />);

        const input = screen.getByPlaceholderText(/Enter Email or Username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Remove/i));

        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText('Error removing member.')).toBeInTheDocument());
    });
});
