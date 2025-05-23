import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberForm, { addMemberToTeam } from '../components/AddMember';

// Mock the addMemberToTeam function
// Mock fetch globally
global.fetch = jest.fn();

describe('addMemberToTeam function', () => {
    beforeEach(() => {
        fetch.mockClear(); // Clear fetch mocks before each test
    });

    it('should successfully add a member when response is OK and JSON', async () => {
        const mockResponse = { message: 'Member added successfully' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
            headers: { get: () => 'application/json' },
        });

        const result = await addMemberToTeam('testUser', 1, 1);
        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/team/add-member",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Authorization": expect.any(String),
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
});


    it('should return a plain text response if the content type is not JSON', async () => {
        const mockResponse = 'Member added successfully';
        fetch.mockResolvedValueOnce({
            ok: true,
            text: async () => mockResponse,
            headers: { get: () => 'text/plain' },
        });

        const result = await addMemberToTeam('testUser', 1, 1);
        expect(result).toBe(mockResponse);
    });

    it('should throw an error if the response is not OK', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            headers: { get: () => 'application/json' },
        });

        await expect(addMemberToTeam('testUser', 1, 1)).rejects.toThrow('Error: 400 Bad Request');
    });
});

describe('TeamMemberForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    it('should render the form with input and button', () => {
        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        expect(screen.getByPlaceholderText(/Enter email or username/i)).toBeInTheDocument();
        expect(screen.getByText(/Add/i)).toBeInTheDocument();
    });

    it('should handle form submission and show success message when member is added', async () => {
        const mockResponse = { message: 'Member added successfully' };
        addMemberToTeam.mockResolvedValueOnce(mockResponse); // Mock the API response

        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        
        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => expect(screen.getByText('Member added successfully')).toBeInTheDocument());
    });

    it('should handle form submission and show error message if there is an API error', async () => {
        const errorMessage = 'Error adding member.';
        addMemberToTeam.mockRejectedValueOnce(new Error(errorMessage)); // Mock API error

        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        
        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
    });

    it('should clear the input after successful member addition', async () => {
        const mockResponse = { message: 'Member added successfully' };
        addMemberToTeam.mockResolvedValueOnce(mockResponse);

        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        
        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => expect(screen.getByText('Member added successfully')).toBeInTheDocument());
        expect(input.value).toBe(''); // Input should be cleared
    });
});
