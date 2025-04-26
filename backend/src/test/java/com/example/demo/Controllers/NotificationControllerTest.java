package com.example.demo.Controllers;

import com.example.demo.Models.Notification;
import com.example.demo.Models.Project;
import com.example.demo.Models.User;
import com.example.demo.Services.NotificationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class NotificationControllerTest {

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private NotificationController notificationController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetNotifications() {
        int userId = 1;

        User user = new User();
        Project project = new Project();

        Notification n1 = new Notification("Welcome!", project, user);
        Notification n2 = new Notification("Task assigned.", project, user);

        List<Notification> mockNotifications = Arrays.asList(n1, n2);

        when(notificationService.getNotificationsForUser(userId)).thenReturn(mockNotifications);

        ResponseEntity<List<Notification>> response = notificationController.getNotifications(userId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("Welcome!", response.getBody().get(0).getContent());

        verify(notificationService, times(1)).getNotificationsForUser(userId);
    }
}
