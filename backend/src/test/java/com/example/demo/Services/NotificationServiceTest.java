package com.example.demo.Services;

import com.example.demo.Models.Notification;
import com.example.demo.Models.Project;
import com.example.demo.Models.User;
import com.example.demo.Repositories.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNotificationsForUser() {
        int userId = 1;

        // Mock user and project
        User user = new User();
        user.setUserID(userId);

        Project project = new Project();
        project.setProjectID(10);

        Notification n1 = new Notification("Task A assigned", project, user);
        Notification n2 = new Notification("Task B updated", project, user);
        List<Notification> mockNotifications = Arrays.asList(n1, n2);

        // Mock repository call
        when(notificationRepository.findByReceivingUserUserID(userId)).thenReturn(mockNotifications);

        // Call service method
        List<Notification> result = notificationService.getNotificationsForUser(userId);

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Task A assigned", result.get(0).getContent());
        assertEquals("Task B updated", result.get(1).getContent());

        // Verify repository interaction
        verify(notificationRepository, times(1)).findByReceivingUserUserID(userId);
    }
}
