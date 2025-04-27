import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeamMemberForm, { addMemberToTeam } from "../components/AddMember"; // importing correctly

// Mock addMemberToTeam function
jest.mock("../components/AddMember", () => {
  const originalModule = jest.requireActual("../components/AddMember");
  return {
    __esModule: true,
    ...originalModule,
    addMemberToTeam: jest.fn(),
  };
});

describe("TeamMemberForm Component", () => {
  const currentUserId = "user123";
  const projectId = "project456";

  beforeEach(() => {
    localStorage.setItem("jwtToken", "mock-token"); // setup token
  });

  afterEach(() => {
    jest.clearAllMocks(); // clear all mocks after each test
  });

  test("renders input and button", () => {
    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    expect(screen.getByPlaceholderText(/Enter email or username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("successfully adds a member and displays success message", async () => {
    addMemberToTeam.mockResolvedValueOnce({ message: "Member added successfully!" });

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledWith("testuser@example.com", currentUserId, projectId);
      expect(screen.getByText(/Member added successfully!/i)).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    addMemberToTeam.mockRejectedValueOnce(new Error("Failed to add member"));

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), {
      target: { value: "erroruser@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledWith("erroruser@example.com", currentUserId, projectId);
      expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument();
    });
  });
});
