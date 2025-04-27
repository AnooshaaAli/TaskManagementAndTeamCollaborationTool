// src/__tests__/AssignTask.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import AssignTask from "../components/AssignTask";

// Mock fetch and localStorage
global.fetch = jest.fn();
Storage.prototype.getItem = jest.fn(() => "mock-jwt-token");

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
    console.log.mockRestore();
});

describe("AssignTask component", () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.getItem.mockClear();
    });

    test("opens modal when assign button is clicked", () => {
        render(<AssignTask taskID={1} taskTitle="Test Task" />);
        
        const assignButton = screen.getByTitle("Assign task");
        fireEvent.click(assignButton);
        
        expect(screen.getByText("Assign Task")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    });

    test("allows typing username", () => {
        render(<AssignTask taskID={1} taskTitle="Test Task" />);
        
        fireEvent.click(screen.getByTitle("Assign task"));
        
        const input = screen.getByPlaceholderText("Enter Username");
        fireEvent.change(input, { target: { value: "testuser" } });
        
        expect(input.value).toBe("testuser");
    });

    test("successful task assignment", async () => {
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ userID: 123 }),
            })
            .mockResolvedValueOnce({
                ok: true,
                text: async () => "Task assigned successfully!",
            });
    
        render(<AssignTask taskID={1} taskTitle="Test Task" />);
        
        // Open modal first
        fireEvent.click(screen.getByTitle("Assign task"));
    
        // Now you can directly access input inside modal
        const input = await screen.findByPlaceholderText("Enter Username");
        fireEvent.change(input, { target: { value: "testuser" } });
    
        const assignButton = await screen.findByRole('button', { name: /^assign$/i });
        fireEvent.click(assignButton);
    
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(screen.getByText("Task assigned successfully!")).toBeInTheDocument();
        });
    });
    

    test("handles user not found error", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}), // No userID returned
        });
    
        render(<AssignTask taskID={1} taskTitle="Test Task" />);
    
        fireEvent.click(screen.getByTitle("Assign task"));
    
        const input = await screen.findByPlaceholderText("Enter Username");
        fireEvent.change(input, { target: { value: "unknownuser" } });
    
        const assignButton = await screen.findByRole('button', { name: /^assign$/i });
        fireEvent.click(assignButton);
    
        await waitFor(() => {
            expect(screen.getByText("User not found.")).toBeInTheDocument();
        });
    });
    

    test("handles fetch failure", async () => {
        fetch.mockRejectedValueOnce(new Error("API failure"));
    
        render(<AssignTask taskID={1} taskTitle="Test Task" />);
    
        fireEvent.click(screen.getByTitle("Assign task"));
    
        const input = await screen.findByPlaceholderText("Enter Username");
        fireEvent.change(input, { target: { value: "failuser" } });
    
        const assignButton = await screen.findByRole('button', { name: /^assign$/i });
        fireEvent.click(assignButton);
    
        await waitFor(() => {
            expect(screen.getByText("Error assigning task.")).toBeInTheDocument();
        });
    });
    
});
