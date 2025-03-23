package com.example.demo.dto;

public class RemoveMemberRequest {
    private String searchInput;
    private int projectId;

    // Getters and setters
    public String getSearchInput() { return searchInput; }
    public void setSearchInput(String searchInput) { this.searchInput = searchInput; }

    public int getProjectId() { return projectId; }
    public void setProjectId(int projectId) { this.projectId = projectId; }
}