import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectPreview from "../components/ProjectPreview";

describe("ProjectPreview", () => {
  const mockOnSelect = jest.fn();

  const defaultProps = {
    id: 1,
    name: "Test Project",
    onSelect: mockOnSelect,
    description: "A test project",
    dueDate: "2025-12-31",
    teamSize: 5,
  };

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders project name", () => {
    render(<ProjectPreview {...defaultProps} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project description, due date, and team size", () => {
    render(<ProjectPreview {...defaultProps} />);
    expect(screen.getByText("A test project")).toBeInTheDocument();
    expect(screen.getByText("2025-12-31")).toBeInTheDocument();
    expect(screen.getByText("5 members")).toBeInTheDocument();
  });

  it("renders default values when optional props are missing", () => {
    render(<ProjectPreview id={2} name="No Optional Props" onSelect={mockOnSelect} />);
    
    expect(screen.getByText("No description available")).toBeInTheDocument();
    expect(screen.getByText("No deadline")).toBeInTheDocument();
    expect(screen.getByText("1 members")).toBeInTheDocument();
  });

  it("calls onSelect with the project id when clicked", () => {
    render(<ProjectPreview {...defaultProps} />);

    const projectCard = screen.getByText("Test Project").closest(".project-card");
    fireEvent.click(projectCard);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it("renders 'View Details' button", () => {
    render(<ProjectPreview {...defaultProps} />);
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });
});
