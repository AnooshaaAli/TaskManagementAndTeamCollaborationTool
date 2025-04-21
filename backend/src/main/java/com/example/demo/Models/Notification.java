package com.example.demo.Models;

import com.example.demo.Models.Project;
import com.example.demo.Models.User;
import jakarta.persistence.*;


@Entity
@Table(name = "Notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationID;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "projectID")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "receivingUserID")
    private User receivingUser;

    // Constructors
    public Notification() {}
    
    public Notification(String content, Project project, User receivingUser) {
        this.content = content;
        this.project = project;
        this.receivingUser = receivingUser;
    }

    // Getters and Setters
    public int getNotificationID() {
        return notificationID;
    }
    public void setNotificationID(int notificationID) {
        this.notificationID = notificationID;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public User getReceivingUser() {
        return receivingUser;
    }
    public void setReceivingUser(User receivingUser) {
        this.receivingUser = receivingUser;
    }
}
