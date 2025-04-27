import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberForm, { addMemberToTeam } from '../components/AddMember'; 

global.fetch = jest.fn(); 

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

        const result = await addMemberToTeam('testUser', 1, 1);

        expect(result).toEqual(mockResponse);

        // Verify fetch was called with the correct arguments
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/team/add-member",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Authorization": "Bearer dummy_token",  // Check the Authorization header
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
        // Mocking an unsuccessful fetch response
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
        jest.clearAllMocks(); // Clear mocks before each test
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
        
        // Mock the resolved value of addMemberToTeam function
        addMemberToTeam.mockResolvedValueOnce(mockResponse);

        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        
        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));
    
        await waitFor(() => expect(screen.getByText('Member added successfully')).toBeInTheDocument());
    });
});
