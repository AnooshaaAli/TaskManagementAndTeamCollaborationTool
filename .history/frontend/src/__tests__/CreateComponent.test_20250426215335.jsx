import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateProject from "../components/CreateProject";

describe("CreateProject component", () => {
    const mockOnProjectCreated = jest.fn();

    beforeEach(() => {
        localStorage.setItem("jwtToken", "mock-token"); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("initially shows only the create button", () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        expect(screen.getByText(/Create New Project/i)).toBeInTheDocument();
    });

    test("displays form when create button is clicked", () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        fireEvent.click(screen.getByText(/Create New Project/i));
        expect(screen.getByLabelText(/Project Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    });

    test("shows validation error if fields are empty", async () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.click(screen.getByText(/Create Project/i));

        await waitFor(() => {
            expect(screen.getByText(/Please complete all required fields/i)).toBeInTheDocument();
        });
    });

    test("calls onProjectCreated on successful project creation", async () => {
        const mockProject = { id: "1", name: "Test", description: "desc" };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockProject),
            })
        );

        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);

        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "desc" } });

        fireEvent.click(screen.getByText(/Create Project/i));

        await waitFor(() => {
            expect(mockOnProjectCreated).toHaveBeenCalledWith(mockProject);
        });
    });

    test("shows error message on failed project creation", async () => {
        const mockErrorMessage = "Error creating project. Please try again.";

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: mockErrorMessage }),
            })
        );

        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);

        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "desc" } });

        fireEvent.click(screen.getByText(/Create Project/i));

        await waitFor(() => {
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });
    });

    test("handles network error during project creation", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);

        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "desc" } });

        fireEvent.click(screen.getByText(/Create Project/i));

        await waitFor(() => {
            expect(screen.getByText("Network error. Please check your connection and try again.")).toBeInTheDocument();
        });
    });

    test("displays loading spinner while creating the project", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: "1", name: "Test", description: "desc" }),
            })
        );

        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);

        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "desc" } });

        fireEvent.click(screen.getByText(/Create Project/i));

        expect(screen.getByText("Creating...")).toBeInTheDocument();
    });

    test("does not allow form submission if project name or description is empty", async () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        
        fireEvent.click(screen.getByText(/Create New Project/i));
        
        // Try submitting with empty fields
        fireEvent.click(screen.getByText(/Create Project/i));

        await waitFor(() => {
            expect(screen.getByText(/Please complete all required fields/i)).toBeInTheDocument();
        });
    });

    test("closes form when cancel button is clicked", () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        
        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.click(screen.getByText(/Cancel/i));

        expect(screen.queryByLabelText(/Project Name/i)).not.toBeInTheDocument();
    });

    test("closes form when close button is clicked", () => {
        render(<CreateProject userID="123" onProjectCreated={mockOnProjectCreated} />);
        
        fireEvent.click(screen.getByText(/Create New Project/i));
        fireEvent.click(screen.getByLabelText(/Close form/i));

        expect(screen.queryByLabelText(/Project Name/i)).not.toBeInTheDocument();
    });
});
