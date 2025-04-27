import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectsPage from '../pages/ProjectsPage';
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap component in Router for navigation
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ username: 'John Doe', role: 'Team Leader', userID: 1, avatar: '/avatar.png' }),
  })
);

describe('ProjectsPage', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('shows loading initially', () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
    
    expect(screen.getByText(/Loading your workspace/i)).toBeInTheDocument();
  });

  test('navigates to dashboard on sidebar click', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
    
    const dashboardLink = screen.getByText(/Dashboard/i);
    
    fireEvent.click(dashboardLink);
    
    // Check if navigation occurs (URL should change)
    await waitFor(() => expect(window.location.pathname).toBe('/dashboard'));
  });

  test('logout button works correctly', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    
    fireEvent.click(logoutButton);
    
    // Ensure that the token is removed from localStorage
    expect(localStorage.getItem('jwtToken')).toBeNull();

    // Check that the user is redirected (check if URL changes)
    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });

  test('renders project page content', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );

    // Wait for user data to load and check that project container is visible
    await waitFor(() => expect(screen.getByText(/Projects/i)).toBeInTheDocument());
    
    // Check if the project content is rendered (e.g., ProjectContainer component)
    expect(screen.getByText(/ProjectContainer/i)).toBeInTheDocument();
  });
});
