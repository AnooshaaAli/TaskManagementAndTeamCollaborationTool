package com.example.demo.dto;

static class AddMemberRequest {
    private String searchInput;
    private int currentUserId;
    private int projectId;

    // Getters and setters
    public String getSearchInput() { return searchInput; }
    public void setSearchInput(String searchInput) { this.searchInput = searchInput; }

    public int getCurrentUserId() { return currentUserId; }
    public void setCurrentUserId(int currentUserId) { this.currentUserId = currentUserId; }

    public int getProjectId() { return projectId; }
    public void setProjectId(int projectId) { this.projectId = projectId; }
}
