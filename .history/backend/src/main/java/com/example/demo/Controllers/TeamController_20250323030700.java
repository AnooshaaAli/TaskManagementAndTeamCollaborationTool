package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Services.TeamService;
import com.example.demo.dto.AddMemberRequest;
import com.example.demo.dto.RemoveMemberRequest;

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

    @PostMapping("/remove-member")
    public ResponseEntity<Map<String, String>> removeMemberFromTeam(@RequestBody RemoveMemberRequest request) {
        String response = teamService.removeMemberFromProject(request.getUserId(), request.getProjectId());
        return ResponseEntity.ok(Map.of("message", response));
    }
}
