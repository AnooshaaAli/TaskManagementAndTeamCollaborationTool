// TaskItem.test.jsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

// Mock the child components used inside TaskItem
jest.mock('../components/EditTask', () => ({ onTaskUpdated }) => (
    <div data-testid="edit-task-form">
        <button onClick={() => onTaskUpdated({ taskID: 1, title: "Updated Task" })}>Save</button>
    </div>
));

jest.mock('../components/DeleteTask', () => ({ taskID, onTaskDeleted }) => (
    <button data-testid="delete-task" onClick={() => onTaskDeleted(taskID)}>
        Delete
    </button>
));

jest.mock('../components/AssignTask', () => ({ taskID, taskTitle }) => (
    <div data-testid="assign-task">Assign {taskTitle}</div>
));

describe("TaskItem", () => {
    const sampleTask = {
        taskID: 1,
        title: "Sample Task",
        status: "In Progress",
        deadline: "2025-05-15",
    };

    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        mockOnEdit.mockReset();
        mockOnDelete.mockReset();
    });

    test("renders task details correctly", () => {
        render(<TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />);

        expect(screen.getByText("Sample Task")).toBeInTheDocument();
        expect(screen.getByText("May 15")).toBeInTheDocument(); // formatted deadline
    });

    test("renders Edit and Delete buttons", () => {
        render(<TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />);

        expect(screen.getByRole("button", { name: "" })).toBeInTheDocument(); // edit button (icon button, no text)
        expect(screen.getByTestId("delete-task")).toBeInTheDocument();
    });

    test("renders AssignTask only if isTeamLead is true", () => {
        const { rerender } = render(
            <TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />
        );

        expect(screen.queryByTestId("assign-task")).not.toBeInTheDocument();

        rerender(
            <TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={true} />
        );

        expect(screen.getByTestId("assign-task")).toBeInTheDocument();
    });

    test("clicking Edit button shows EditTask form", () => {
        render(<TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />);

        const editButton = screen.getByRole("button", { name: "" }); // The edit button
        fireEvent.click(editButton);

        expect(screen.getByTestId("edit-task-form")).toBeInTheDocument();
    });

    test("clicking Save inside EditTask calls onEdit", () => {
        render(<TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />);

        fireEvent.click(screen.getByRole("button", { name: "" })); // Click edit
        fireEvent.click(screen.getByText("Save")); // Click Save button inside mocked EditTask

        expect(mockOnEdit).toHaveBeenCalledWith({ taskID: 1, title: "Updated Task" });
    });

    test("clicking Delete button calls onDelete", () => {
        render(<TaskItem task={sampleTask} onEdit={mockOnEdit} onDelete={mockOnDelete} isTeamLead={false} />);

        fireEvent.click(screen.getByTestId("delete-task"));

        expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
});
