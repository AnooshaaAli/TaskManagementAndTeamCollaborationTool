package com.example.demo.dto;

public class RemoveMemberRequest {
    private int userId;
    private int projectId;

    // Getters and setters
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getProjectId() { return projectId; }
    public void setProjectId(int projectId) { this.projectId = projectId; }
}