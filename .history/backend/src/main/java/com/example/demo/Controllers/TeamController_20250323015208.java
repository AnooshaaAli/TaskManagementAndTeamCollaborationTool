package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Services.TeamService;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/add-member")
    public ResponseEntity<String> addMember(@RequestBody AddMemberRequest request) {
        String searchInput = request.getSearchInput();
        int currentUserId = request.getCurrentUserId();
        int projectId = request.getProjectId();

        String response = teamService.addMemberToProject(searchInput, currentUserId, projectId);
        return ResponseEntity.ok(response);
    }

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
}
