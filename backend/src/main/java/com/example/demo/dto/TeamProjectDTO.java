package com.example.demo.dto;

public class TeamProjectDTO {
    private int teamID;
    private int projectID;

    public TeamProjectDTO(int teamID, int projectID) {
        this.teamID = teamID;
        this.projectID = projectID;
    }

    // Getters
    public int getTeamID() {
        return teamID;
    }

    public int getProjectID() {
        return projectID;
    }
}
