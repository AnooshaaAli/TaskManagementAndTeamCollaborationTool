import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage'; // Adjust the path as necessary
import userEvent from '@testing-library/user-event';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ username: 'John Doe', userID: '123', role: 'Admin', avatar: '/path/to/avatar' }),
  })
);

describe('ProjectsPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );
    // Ensure loading state is displayed
    expect(screen.getByText(/Loading your workspace.../i)).toBeInTheDocument();
  });

  test('renders user data after loading', async () => {
    render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );

    // Wait for the loading state to disappear and the user data to render
    await waitFor(() => screen.getByText(/John Doe/i));

    // Ensure the user data (username, role, avatar) is rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toHaveAttribute('src', '/path/to/avatar');
  });

  test('logout button works correctly', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );

    // Wait for the user data to load
    await waitFor(() => screen.getByText(/John Doe/i));

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);

    // Check if localStorage.removeItem is called
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
    // Assuming you have some code to navigate to login
    expect(window.location.href).toBe('/login');
  });

  test('navigation to dashboard works', async () => {
    const navigate = require('react-router-dom').useNavigate;

    render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );

    // Wait for the loading to finish
    await waitFor(() => screen.getByText(/John Doe/i));

    const dashboardNavItem = screen.getByText(/Dashboard/i);

    userEvent.click(dashboardNavItem);

    // Assert that the navigate function was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  test('renders projects content correctly', async () => {
    render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );

    // Wait for the user data to load
    await waitFor(() => screen.getByText(/John Doe/i));

    // Ensure the ProjectContainer is rendered
    expect(screen.getByText(/Loading projects.../i)).toBeInTheDocument();
  });
});
