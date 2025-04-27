import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import ProjectsPage from '../pages/ProjectsPage';
import { BrowserRouter as Router } from 'react-router-dom'; 
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ username: 'John Doe', role: 'Team Leader', userID: 1, avatar: '/avatar.png' }),
  })
);

describe('ProjectsPage', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('shows loading initially', () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
    
    expect(screen.getByText(/Loading your workspace/i)).toBeInTheDocument();
  });

  test('renders project page content', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
  
    // Wait for the loading state to finish
    await waitFor(() => screen.getByText(/Loading your workspace.../i));
  
    // Use queryAllByText to handle multiple matches of "Projects"
    const projectElements = screen.queryAllByText(/Projects/i);
    expect(projectElements.length).toBeGreaterThan(0);
  
    // Query ProjectContainer by the data-testid
    const projectContainer = screen.getByTestId('project-container');
    expect(projectContainer).toBeInTheDocument();
  });  
  
  test('logout button works correctly', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
  
    // Wait for the loading text to disappear (i.e., wait until the page is fully rendered)
    await waitFor(() => screen.queryByText(/Loading your workspace.../i), { timeout: 5000 });
  
    // Now, find the logout button and simulate the click
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
  
    // Verify that the token is removed from localStorage
    expect(localStorage.getItem('jwtToken')).toBeNull();
  
    // Ensure the page redirects to '/login'
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });  

});
