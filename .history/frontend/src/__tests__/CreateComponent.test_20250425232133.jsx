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

});