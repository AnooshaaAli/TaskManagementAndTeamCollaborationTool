import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeamMemberForm, { addMemberToTeam } from "../components/AddMember"; // Import both the component and the function

// Mock only the addMemberToTeam function
jest.mock("../components/AddMember", () => ({
  ...jest.requireActual("../components/AddMember"), // Keep the actual implementation of the component
  addMemberToTeam: jest.fn(), // Mock only the function
}));

describe("TeamMemberForm Component", () => {
  const currentUserId = "user123";
  const projectId = "project456";

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("jwtToken", "mock-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and add button", async () => {
    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);
    
    // Check if the input field is rendered correctly
    const input = await screen.findByPlaceholderText(/Enter email or username/i);
    const button = screen.getByRole('button', { name: /add/i });
    
    // Assertions
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("successfully adds a member", async () => {
    const mockResponse = {
      message: "User successfully added to the team.",
    };

    addMemberToTeam.mockResolvedValue(mockResponse); // Mocking resolved response

    render(<TeamMemberForm currentUserId={1} projectId={1} />);

    const input = screen.getByPlaceholderText("Enter email or username");
    const button = screen.getByRole('button', { name: /add/i });

    // Simulate input change and button click
    fireEvent.change(input, { target: { value: "testuser@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledTimes(1); // Check if API function was called
      expect(screen.getByText(/User successfully added to the team./i)).toBeInTheDocument(); // Check if success message is shown
    });
  });

  test("shows error message when API call fails", async () => {
    const mockError = { message: "Failed to add member" };

    addMemberToTeam.mockRejectedValue(mockError); // Mocking rejected response

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    // Simulate input change and button click
    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), {
      target: { value: "erroruser@example.com" },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledTimes(1); // Check if API function was called
      expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument(); // Check if error message is shown
    });
  });
});
