import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';


jest.mock('react-router-dom');

beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === 'jwtToken') return 'mocked-jwt-token';
    if (key === 'theme') return 'dark';
    return null;
  });

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();

  global.fetch = jest.fn((url) => {
    if (url.endsWith('/auth/user')) {
      return Promise.resolve({
        json: () => Promise.resolve({ userID: 1, username: 'TestUser', role: 'Developer', avatar: '' })
      });
    }
    if (url.includes('/api/notifications/')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, message: 'Notification 1' }])
      });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};
  
describe('DashboardPage', () => {
  test('shows loading initially', async () => {
    renderWithRouter(<DashboardPage />);
    expect(screen.getByText(/Loading your workspace/i)).toBeInTheDocument();
  });

  test('renders dashboard after loading', async () => {
    renderWithRouter(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome, TestUser/i)).toBeInTheDocument();
    });
  });

  test('toggles theme', async () => {
    renderWithRouter(<DashboardPage />);
    await waitFor(() => screen.getByText(/Welcome, TestUser/i));

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
  
  test('switches tabs between tasks and activity', async () => {
    renderWithRouter(<DashboardPage />);
    await waitFor(() => screen.getByText(/Welcome, TestUser/i));

    const tasksButton = screen.getByRole('button', { name: /My Tasks/i });
    fireEvent.click(tasksButton);

    expect(screen.getByText(/No tasks assigned yet/i)).toBeInTheDocument();

    const activityButton = screen.getByRole('button', { name: /Activity/i });
    fireEvent.click(activityButton);

    expect(screen.getByText(/No recent activity/i)).toBeInTheDocument();
  });

  test('logout removes token and redirects', async () => {
    delete window.location;
    window.location = { href: '' };

    renderWithRouter(<DashboardPage />);
    await waitFor(() => screen.getByText(/Welcome, TestUser/i));

    const logoutButton = screen.getAllByRole('button', { name: /logout/i })[0];
    fireEvent.click(logoutButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
    expect(window.location.href).toBe('/login');
  });
});
