import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberForm, { addMemberToTeam } from '../components/AddMember';

// Mock the addMemberToTeam function
jest.mock('../components/AddMember', () => ({
  ...jest.requireActual('../components/TeamMemberForm'),
  addMemberToTeam: jest.fn(),
}));

describe('TeamMemberForm component', () => {
  const mockCurrentUserId = 1;
  const mockProjectId = 101;

  beforeEach(() => {
    localStorage.setItem('jwtToken', 'mock-token'); // Set mock token
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form and handles user input', () => {
    render(<TeamMemberForm currentUserId={mockCurrentUserId} projectId={mockProjectId} />);
    expect(screen.getByText(/Add Member to Team/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email or username/i)).toBeInTheDocument();
    
    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: 'newuser@example.com' } });
    expect(screen.getByPlaceholderText(/Enter email or username/i).value).toBe('newuser@example.com');
  });

  test('successfully adds a member and displays success message', async () => {
    const mockResponse = { message: 'Member successfully added.' };
    addMemberToTeam.mockResolvedValue(mockResponse); // Mock the API response

    render(<TeamMemberForm currentUserId={mockCurrentUserId} projectId={mockProjectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: 'newuser@example.com' } });
    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByText(/Member successfully added./i)).toBeInTheDocument(); // Check success message
    });
  });

  test('handles API error and displays error message', async () => {
    const mockError = new Error('Network error');
    addMemberToTeam.mockRejectedValue(mockError); // Mock the API rejection

    render(<TeamMemberForm currentUserId={mockCurrentUserId} projectId={mockProjectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: 'newuser@example.com' } });
    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument(); // Check error message
    });
  });

  test('handles unexpected API response type (non-JSON)', async () => {
    const mockResponse = 'Unexpected response';
    addMemberToTeam.mockResolvedValue(mockResponse); // Mock unexpected API response (string)

    render(<TeamMemberForm currentUserId={mockCurrentUserId} projectId={mockProjectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: 'newuser@example.com' } });
    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByText(/Unexpected response/i)).toBeInTheDocument(); // Check message for non-JSON response
    });
  });
});
