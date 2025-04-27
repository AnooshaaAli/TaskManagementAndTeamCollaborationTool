import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import List from "../components/List.jsx";

// Mock child components
jest.mock("../components/TaskItem.jsx", () => ({
  __esModule: true,
  default: ({ task }) => <div data-testid="task-item">{task.title}</div>,
}));
jest.mock("../components/DeleteList.jsx", () => ({
  __esModule: true,
  default: ({ onDeleteSuccess }) => (
    <button data-testid="delete-list" onClick={onDeleteSuccess}>
      Delete
    </button>
  ),
}));
jest.mock("../components/CreateTask.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="create-task">Create Task Form</div>,
}));

describe("List", () => {
  const mockList = {
    listID: 1,
    name: "Test List",
    tasks: {
      1: { taskID: 1, title: "Task One" },
      2: { taskID: 2, title: "Task Two" },
    },
  };

  const mockOnUpdateList = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockList),
      })
    );
    mockOnUpdateList.mockClear();
    mockOnDelete.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<List list={mockList} onUpdateList={mockOnUpdateList} onDelete={mockOnDelete} isTeamLead={true} />);
    expect(screen.getByText("Loading list...")).toBeInTheDocument();
  });

  it("renders list name and tasks after fetch", async () => {
    render(<List list={mockList} onUpdateList={mockOnUpdateList} onDelete={mockOnDelete} isTeamLead={true} />);

    expect(screen.getByText("Loading list...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test List")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("task-item")).toHaveLength(2);
    expect(screen.getByTestId("create-task")).toBeInTheDocument();
  });

  it("renders empty message when no tasks", async () => {
    const listWithNoTasks = { ...mockList, tasks: {} };

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(listWithNoTasks),
      })
    );

    render(<List list={listWithNoTasks} onUpdateList={mockOnUpdateList} onDelete={mockOnDelete} isTeamLead={true} />);

    await waitFor(() => {
      expect(screen.getByText("No tasks in this list.")).toBeInTheDocument();
    });
  });

  it("renders error message on fetch failure", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<List list={mockList} onUpdateList={mockOnUpdateList} onDelete={mockOnDelete} isTeamLead={true} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load list data")).toBeInTheDocument();
    });
  });

  it("calls onDelete when DeleteList is clicked", async () => {
    render(<List list={mockList} onUpdateList={mockOnUpdateList} onDelete={mockOnDelete} isTeamLead={true} />);

    await waitFor(() => {
      expect(screen.getByText("Test List")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("delete-list"));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
