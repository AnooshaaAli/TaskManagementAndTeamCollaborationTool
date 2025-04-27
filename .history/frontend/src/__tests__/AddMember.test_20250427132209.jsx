import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeamMemberForm from "../components/AddMember";

jest.mock("../services/teamService", () => ({
  addMemberToTeam: jest.fn(),
}));

import { addMemberToTeam } from "../services/teamService";

describe("TeamMemberForm Component", () => {
  const currentUserId = "user123";
  const projectId = "project456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and button", () => {
    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);
    expect(screen.getByPlaceholderText(/Enter email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test("successfully adds a member and displays success message", async () => {
    addMemberToTeam.mockResolvedValue({ success: true });

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter email address/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledWith(
        "testuser@example.com",
        currentUserId,
        projectId
      );
      expect(screen.getByText(/Member added successfully!/i)).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    addMemberToTeam.mockRejectedValue(new Error("Failed to add member"));

    render(<TeamMemberForm currentUserId={currentUserId} projectId={projectId} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter email address/i), {
      target: { value: "erroruser@example.com" },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(addMemberToTeam).toHaveBeenCalledWith(
        "erroruser@example.com",
        currentUserId,
        projectId
      );
      expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument();
    });
  });
});
