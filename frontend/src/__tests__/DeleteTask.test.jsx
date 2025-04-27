import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteTask from "../components/DeleteTask"; // adjust the path if needed

// Mock the ConfirmDialog component
jest.mock("../components/ConfirmDialog", () => ({ message, onConfirm, onCancel }) => (
    <div data-testid="confirm-dialog">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
    </div>
));

describe("DeleteTask component", () => {
    const mockOnTaskDeleted = jest.fn();
    const sampleTaskID = "1";

    beforeEach(() => {
        localStorage.setItem("jwtToken", "mock-token");
        mockOnTaskDeleted.mockClear();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders delete button", () => {
        render(<DeleteTask taskID={sampleTaskID} onTaskDeleted={mockOnTaskDeleted} />);
        
        const deleteButton = screen.getByRole("button");
        expect(deleteButton).toBeInTheDocument();
    });

    test("opens confirm dialog when delete button is clicked", () => {
        render(<DeleteTask taskID={sampleTaskID} onTaskDeleted={mockOnTaskDeleted} />);
        
        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);
        
        expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
        expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });

    test("calls onTaskDeleted after confirming deletion", async () => {
        global.fetch.mockResolvedValueOnce({ ok: true });

        render(<DeleteTask taskID={sampleTaskID} onTaskDeleted={mockOnTaskDeleted} />);
        
        fireEvent.click(screen.getByRole("button")); // click trash button to open dialog
        fireEvent.click(screen.getByText(/confirm/i)); // click Confirm

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `http://localhost:8080/tasks/${sampleTaskID}`,
                expect.objectContaining({
                    method: "DELETE",
                    headers: expect.objectContaining({
                        Authorization: `Bearer mock-token`
                    })
                })
            );
            expect(mockOnTaskDeleted).toHaveBeenCalledWith(sampleTaskID);
        });
    });

    test("does not call onTaskDeleted if cancel is clicked", async () => {
        render(<DeleteTask taskID={sampleTaskID} onTaskDeleted={mockOnTaskDeleted} />);
        
        fireEvent.click(screen.getByRole("button")); // open dialog
        fireEvent.click(screen.getByText(/cancel/i)); // click Cancel

        await waitFor(() => {
            expect(global.fetch).not.toHaveBeenCalled();
            expect(mockOnTaskDeleted).not.toHaveBeenCalled();
        });
    });

    test("handles fetch failure gracefully", async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // <--- suppress error printing
    
        global.fetch.mockResolvedValueOnce({ ok: false }); // Simulate server error
    
        render(<DeleteTask taskID={sampleTaskID} onTaskDeleted={mockOnTaskDeleted} />);
        
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/confirm/i));
    
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
            expect(mockOnTaskDeleted).not.toHaveBeenCalled();
        });
    
        consoleErrorMock.mockRestore(); // <--- clean up after test
    });
    
});
