import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TeamMemberForm from "../components/AddMember";  // Adjust the import path if needed
import { addMemberToTeam } from "../components/AddMember";  // Mocking the function

jest.mock("../components/AddMember", () => ({
    ...jest.requireActual("../components/AddMember"),
    addMemberToTeam: jest.fn(),
}));

describe("TeamMemberForm component", () => {
    beforeEach(() => {
        localStorage.setItem("jwtToken", "mock-token");  // Mock JWT token for authentication
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("handles successful member addition", async () => {
        const mockResponse = { message: "Member added successfully" };
        addMemberToTeam.mockResolvedValue(mockResponse);

        render(<TeamMemberForm currentUserId="123" projectId="456" />);

        fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: "newmember@example.com" } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => {
            expect(screen.getByText(/Member added successfully/i)).toBeInTheDocument();
        });
    });

    test("handles error during member addition", async () => {
        const mockError = new Error("Failed to add member");
        addMemberToTeam.mockRejectedValue(mockError);

        render(<TeamMemberForm currentUserId="123" projectId="456" />);

        fireEvent.change(screen.getByPlaceholderText(/Enter email or username/i), { target: { value: "invalidmember@example.com" } });
        fireEvent.click(screen.getByText(/Add/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to add member/i)).toBeInTheDocument();
        });
    });
});
