// src/__tests__/NotificationList.test.jsx
import { render, screen } from '@testing-library/react';
import NotificationList from '../components/NotificationList';

describe('NotificationList', () => {
  test('renders "No notifications" message when list is empty', () => {
    render(<NotificationList notifications={[]} />);
    
    const noNotificationsMessage = screen.getByText(/no notifications/i);
    expect(noNotificationsMessage).toBeInTheDocument();
  });

  test('renders notifications when list is not empty', () => {
    const mockNotifications = [
      { notificationID: 1, content: "First notification" },
      { notificationID: 2, content: "Second notification" },
    ];

    render(<NotificationList notifications={mockNotifications} />);

    // Check if both notifications are rendered
    expect(screen.getByText("First notification")).toBeInTheDocument();
    expect(screen.getByText("Second notification")).toBeInTheDocument();
  });

  test('renders correct number of notifications', () => {
    const mockNotifications = [
      { notificationID: 1, content: "Notification 1" },
      { notificationID: 2, content: "Notification 2" },
      { notificationID: 3, content: "Notification 3" },
    ];

    render(<NotificationList notifications={mockNotifications} />);

    const notificationItems = screen.getAllByRole('listitem');
    expect(notificationItems).toHaveLength(3);
  });
});
