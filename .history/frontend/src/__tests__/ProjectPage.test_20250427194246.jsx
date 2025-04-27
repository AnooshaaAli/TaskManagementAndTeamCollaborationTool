import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  test('navigates to dashboard on sidebar click', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
    
    const dashboardLink = screen.getByText(/Dashboard/i);
    
    fireEvent.click(dashboardLink);
    
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
    
    expect(localStorage.getItem('jwtToken')).toBeNull();

    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });

  test('renders project page content', async () => {
    render(
      <Router>
        <ProjectsPage />
      </Router>
    );
  
    const projectTextElements = screen.getAllByText(/Projects/i);
    
    expect(projectTextElements[0]).toBeInTheDocument(); // Assuming it's the first "Projects" element in the sidebar
    // Assert that the ProjectContainer is rendered as well
    expect(screen.getByText(/ProjectContainer/i)).toBeInTheDocument();
  });
  
});
