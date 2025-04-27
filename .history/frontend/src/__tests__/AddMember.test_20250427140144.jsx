import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeamMemberForm from "../components/AddMember"; // Import both

jest.mock("../components/AddMember", () => ({
  addMemberToTeam: jest.fn(),  // Only mock the function here
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
    
    const input = await screen.findByPlaceholderText(/Enter email or username/i);
    const button = screen.getByRole('button', { name: /add/i });
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("successfully adds a member", async () => {
    const mockResponse = {
      message: "User successfully added to the team.",
    };

    addMemberToTeam.mockResolvedValue(mockResponse);

    render(<TeamMemberForm currentUserId={1} projectId={1} />);

    const input = screen.getByPlaceholderText("Enter email or username");
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: "testuser@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/User successfully added to the team./i)).toBeInTheDocument();
    });
  });

  test("shows error message when API call fails", async () => {
    const mockError = { message: "Failed to add member" };

    addMemberToTeam.mockRejectedValue(mockError);

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), {
      target: { value: "erroruser@example.com" },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument();
    });
  });
});
