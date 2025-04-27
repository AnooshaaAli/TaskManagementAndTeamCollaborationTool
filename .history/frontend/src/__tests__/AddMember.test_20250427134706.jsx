import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeamMemberForm, { addMemberToTeam } from "../components/AddMember"; // Import both default and named export

// Mock only the addMemberToTeam function (named export)
jest.mock("../components/AddMember", () => ({
  ...jest.requireActual("../components/AddMember"), // Preserve other exports (like TeamMemberForm)
  addMemberToTeam: jest.fn(), // Mock the named export
}));

describe("TeamMemberForm Component", () => {
  const currentUserId = "user123";
  const projectId = "project456";

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("jwtToken", "mock-token"); 
  });

  test("renders input and add button", () => {
    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);
    expect(screen.getByPlaceholderText(/Enter email or username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('successfully adds a member', async () => {
    const mockResponse = {
      message: "User successfully added to the team.",
    };

    addMemberToTeam.mockResolvedValue(mockResponse); // Mock the API response

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

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockError),
      })
    );

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), {
      target: { value: "erroruser@example.com" },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument();
    });
  });
});
