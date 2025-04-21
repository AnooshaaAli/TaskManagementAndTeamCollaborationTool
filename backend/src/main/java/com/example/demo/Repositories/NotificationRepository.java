package com.example.demo.Repositories;

import com.example.demo.Models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByReceivingUserUserID(int userID);
}
