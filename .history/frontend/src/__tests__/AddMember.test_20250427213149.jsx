import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberForm from '../components/AddMember'; // Import the component
import * as AddMember from '../components/AddMember'; // Import the module to mock

// Mock fetch globally
global.fetch = jest.fn();

// Mock the addMemberToTeam function from the module
jest.mock('../components/AddMember', () => ({
    ...jest.requireActual('../components/AddMember'),  // Keep the actual exports
    addMemberToTeam: jest.fn(),  // Mock the addMemberToTeam function
}));

describe('addMemberToTeam function', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.clear();
    });

    it('should successfully add a member when response is OK and JSON', async () => {
        const mockResponse = { message: 'Member added successfully' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
            headers: { get: () => 'application/json' },
        });

        localStorage.setItem('jwtToken', 'dummy_token');

        const result = await AddMember.addMemberToTeam('testUser', 1, 1);

        expect(result).toEqual(mockResponse);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/team/add-member",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Authorization": "Bearer dummy_token",
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    searchInput: 'testUser',
                    currentUserId: 1,
                    projectId: 1,
                }),
            })
        );
    });

    it('should throw an error if the response is not OK', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            headers: { get: () => 'application/json' },
        });

        await expect(AddMember.addMemberToTeam('testUser', 1, 1)).rejects.toThrow('Error: 400 Bad Request');
    });
});

describe('TeamMemberForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the form with input and button", () => {
        render(<TeamMemberForm currentUserId={1} projectId={1} />);

        const input = screen.getByPlaceholderText("Enter email or username");
        const button = screen.getByRole("button", { name: /Add/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should handle form submission and show success message when member is added', async () => {
        const mockResponse = { message: 'Member added successfully' };

        // Mock the resolved value of addMemberToTeam for the component test
        AddMember.addMemberToTeam.mockResolvedValueOnce(mockResponse);

        render(<TeamMemberForm currentUserId={1} projectId={1} />);

        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => expect(screen.getByText('Member added successfully')).toBeInTheDocument());
    });
});
