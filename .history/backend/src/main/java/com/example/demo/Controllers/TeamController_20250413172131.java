package com.example.demo.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Models.Team;
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
        return teamService.removeMemberFromProject(request.getSearchInput(), request.getProjectId());
    }

    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<Void> deleteTeamByProjectId(@PathVariable int projectId) {
        teamService.deleteByProjectId(projectId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Team>> getTeamsByUserId(@PathVariable int userId) {
        // Call service to get all teams the user is a part of
        List<Team> teams = teamService.getTeamsByUserId(userId);

        return ResponseEntity.ok(teams);
    }
}
