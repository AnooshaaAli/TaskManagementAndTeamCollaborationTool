package com.example.demo.Controllers;

import com.example.demo.Models.Notification;
import com.example.demo.Services.NotificationService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;



@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userID}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable int userID) {
        System.out.println("🟢 Controller hit with userID: " + userID);
        List<Notification> notifications = notificationService.getNotificationsForUser(userID);
        return ResponseEntity.ok(notifications);
    }
}
