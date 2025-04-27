import '@testing-library/jest-dom';

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectContainer from "../components/ProjectContainer";

// Mock child components
jest.mock("../components/Project.jsx", () => () => <div>Mocked Project</div>);
jest.mock("../components/ProjectPreview.jsx", () => ({ name, onSelect }) => (
  <div onClick={() => onSelect(1)}>Mocked ProjectPreview - {name}</div>
));
jest.mock("../components/CreateProject.jsx", () => ({ onProjectCreated }) => (
  <div onClick={() => onProjectCreated({ projectID: 99, name: "New Project" })}>
    Mocked CreateProject
  </div>
));

describe("ProjectContainer", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches projects and shows project previews", async () => {
    const mockProjects = [
      { projectID: 1, name: "Project 1", description: "Desc 1" },
      { projectID: 2, name: "Project 2", description: "Desc 2" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(mockProjects),
    });

    render(<ProjectContainer userID="123" />);

    await waitFor(() => {
      expect(screen.getByText("Mocked ProjectPreview - Project 1")).toBeInTheDocument();
      expect(screen.getByText("Mocked ProjectPreview - Project 2")).toBeInTheDocument();
    });
  });

  it("shows CreateProject when no projects exist", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify([]),
    });

    render(<ProjectContainer userID="123" />);

    await waitFor(() => {
      expect(screen.getByText("Mocked CreateProject")).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch error"));

    render(<ProjectContainer userID="123" />);

    await waitFor(() => {
      expect(screen.getByText("Mocked CreateProject")).toBeInTheDocument();
    });
  });

  it("should select a project when clicking a project preview", async () => {
    const mockProjects = [
      { projectID: 1, name: "Project 1", description: "Desc 1" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(mockProjects),
    });

    render(<ProjectContainer userID="123" />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Mocked ProjectPreview - Project 1"));
    });

    expect(screen.getByText("Mocked Project")).toBeInTheDocument();
  });

  it("adds a project dynamically when CreateProject triggers", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify([]),
    });

    render(<ProjectContainer userID="123" />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Mocked CreateProject"));
    });

    await waitFor(() => {
      expect(screen.getByText("Mocked ProjectPreview - New Project")).toBeInTheDocument();
    });
  });

});
