import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberForm, { addMemberToTeam } from '../components/AddMember';

// Mock the addMemberToTeam function to avoid making real API calls
jest.mock('../components/AddMember', () => ({
    ...jest.requireActual('../components/AddMember'),
    addMemberToTeam: jest.fn(),
  }));
  
  describe('addMemberToTeam function', () => {
      beforeEach(() => {
          addMemberToTeam.mockClear(); // Ensure to clear mocks before each test
      });
  
      it('should successfully add a member when response is OK and JSON', async () => {
          const mockResponse = { message: 'Member added successfully' };
          addMemberToTeam.mockResolvedValueOnce(mockResponse); // Mock the response
  
          const result = await addMemberToTeam('testUser', 1, 1);
          expect(result).toEqual(mockResponse);
          expect(addMemberToTeam).toHaveBeenCalledWith('testUser', 1, 1);
      });
  
      it('should return a plain text response if the content type is not JSON', async () => {
          const mockResponse = 'Member added successfully';
          addMemberToTeam.mockResolvedValueOnce(mockResponse); // Mock plain text response
  
          const result = await addMemberToTeam('testUser', 1, 1);
          expect(result).toBe(mockResponse);
      });
  
      it('should throw an error if the response is not OK', async () => {
          addMemberToTeam.mockRejectedValueOnce(new Error('Error: 400 Bad Request')); // Mock an error
  
          await expect(addMemberToTeam('testUser', 1, 1)).rejects.toThrow('Error: 400 Bad Request');
      });
  });

describe('TeamMemberForm component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test("should render the form with input and button", () => {
        render(<TeamMemberForm currentUserId={1} projectId={1} />);
      
        // Ensure the input is present
        const input = screen.getByPlaceholderText("Enter email or username");
      
        // Ensure the button is the correct element
        const button = screen.getByRole("button", { name: /Add/i });
      
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
      });       

    it('should handle form submission and show success message when member is added', async () => {
        const mockResponse = { message: 'Member added successfully' };
        addMemberToTeam.mockResolvedValueOnce(mockResponse); 

        render(<TeamMemberForm currentUserId={1} projectId={1} />);
        
        const input = screen.getByPlaceholderText(/Enter email or username/i);
        fireEvent.change(input, { target: { value: 'testUser' } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => expect(screen.getByText('Member added successfully')).toBeInTheDocument());
    });

    it('should handle form submission and show error message if there is an API error', async () => {
        const errorMessage = 'Error adding member.';
        addMemberToTeam.mockRejectedValueOnce(new Error(errorMessage)); 

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
        expect(input.value).toBe(''); 
    });
});
