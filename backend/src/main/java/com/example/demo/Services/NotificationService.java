package com.example.demo.Services;

import com.example.demo.Models.Notification;
import com.example.demo.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.Models.User;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

     public List<Notification> getNotificationsForUser(int userID) {
        List<Notification> notifications = notificationRepository.findByReceivingUserUserID(userID);
        System.out.println("Fetched Notifications for user " + userID + ":");
        for (Notification n : notifications) {
            System.out.println(" - " + n.getContent());
        }
        return notifications;
    }
}
