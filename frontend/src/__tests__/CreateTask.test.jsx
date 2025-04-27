import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateTask from "../components/CreateTask";

describe("CreateTask component", () => {
    const mockOnTaskCreated = jest.fn();

    beforeEach(() => {
        localStorage.setItem("jwtToken", "mock-token"); // Set token to prevent fetch error
    });

    afterEach(() => {
        jest.clearAllMocks();
        global.fetch && (global.fetch = undefined); // clean fetch if mocked
    });

    test("renders task title and deadline inputs", () => {
        render(<CreateTask listID="1" onTaskCreated={mockOnTaskCreated} />);
        
        expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "" })).toBeInTheDocument(); // deadline input has no label
    });

    test("does not create task when title is empty", async () => {
        // Set up fetch as a mock function first
        global.fetch = jest.fn();
    
        const fetchSpy = jest.spyOn(global, "fetch");
    
        render(<CreateTask listID="1" onTaskCreated={mockOnTaskCreated} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
    
        await waitFor(() => {
            expect(fetchSpy).not.toHaveBeenCalled();
        });
    
        fetchSpy.mockRestore();
    });
    
    
    test("creates task when title is filled", async () => {
        const mockTask = { id: "1", title: "New Task", status: "To Do", deadline: "No deadline" };
    
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockTask),
            })
        );
    
        render(<CreateTask listID="1" onTaskCreated={mockOnTaskCreated} />);
        const input = screen.getByPlaceholderText(/Add a new task/i);
        const button = screen.getByRole("button");
    
        await userEvent.type(input, "New Task"); // ✅ Simulate typing
    
        fireEvent.click(button);
    
        await waitFor(() => {
            expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
        });
    });
    

    test("calls onTaskCreated after successful creation", async () => {
        const mockTask = { id: "1", title: "New Task", status: "To Do", deadline: "No deadline" };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockTask),
            })
        );

        render(<CreateTask listID="1" onTaskCreated={mockOnTaskCreated} />);

        fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), {
            target: { value: "New Task" },
        });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
        });
    });

    test("handles fetch error gracefully", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        render(<CreateTask listID="1" onTaskCreated={mockOnTaskCreated} />);

        fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), {
            target: { value: "Fail Task" },
        });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled();
        });

        consoleErrorSpy.mockRestore();
    });
});
