import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTask from "../components/EditTask"; // adjust if needed

describe("EditTask component", () => {
    const mockOnTaskUpdated = jest.fn();
    const sampleTask = {
        taskID: "1",
        title: "Sample Task",
        status: "To Do",
        deadline: "2024-05-01"
    };

    beforeEach(() => {
        localStorage.setItem("jwtToken", "mock-token");
        mockOnTaskUpdated.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
        global.fetch && (global.fetch = undefined);
    });

    test("renders all fields correctly", () => {
        render(<EditTask task={sampleTask} onTaskUpdated={mockOnTaskUpdated} />);
      
        expect(screen.getByDisplayValue("Sample Task")).toBeInTheDocument();
        expect(screen.getByDisplayValue("To Do")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2024-05-01")).toBeInTheDocument();
      
        // Use getByRole for buttons instead of container.querySelector
        //const saveButton = screen.getByRole("button", { name: /save/i });
        //const cancelButton = screen.getByRole("button", { name: /cancel/i });
      
        //expect(saveButton).toBeInTheDocument();
        //expect(cancelButton).toBeInTheDocument();
      });
      
    
      test("updates title when user types", () => {
        render(<EditTask task={sampleTask} onTaskUpdated={mockOnTaskUpdated} />);

        const titleInput = screen.getByDisplayValue("Sample Task");
        fireEvent.change(titleInput, { target: { value: "Updated Task" } });

        expect(titleInput.value).toBe("Updated Task");
    });

    test("updates status when user selects new status", () => {
        render(<EditTask task={sampleTask} onTaskUpdated={mockOnTaskUpdated} />);

        const statusSelect = screen.getByDisplayValue("To Do");
        fireEvent.change(statusSelect, { target: { value: "Completed" } });

        expect(statusSelect.value).toBe("Completed");
    });

    test("updates deadline when user picks new date", () => {
        render(<EditTask task={sampleTask} onTaskUpdated={mockOnTaskUpdated} />);

        const dateInput = screen.getByDisplayValue("2024-05-01");
        fireEvent.change(dateInput, { target: { value: "2024-06-01" } });

        expect(dateInput.value).toBe("2024-06-01");
    });
      

    test("calls onTaskUpdated when cancel button is clicked", () => {
        render(<EditTask task={sampleTask} onTaskUpdated={mockOnTaskUpdated} />);

        const cancelButton = screen.getAllByRole("button", { name: "" })[1]; // Second button (X button)
        fireEvent.click(cancelButton);

        expect(mockOnTaskUpdated).toHaveBeenCalledWith(sampleTask);
    });
});
