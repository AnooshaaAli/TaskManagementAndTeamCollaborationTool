package com.example.demo.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.example.demo.Models.Team;
import com.example.demo.Repositories.TeamHasMemberRepository;
import com.example.demo.Services.TeamService;
import com.example.demo.dto.AddMemberRequest;
import com.example.demo.dto.RemoveMemberRequest;
import com.example.demo.dto.TeamProjectDTO;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private RestTemplate restTemplate;

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
    public ResponseEntity<List<TeamProjectDTO>> getTeamAndProjectIDByUserId(@PathVariable int userId) {
        List<Team> teams = teamService.getTeamsByUserId(userId);

        List<TeamProjectDTO> result = teams.stream()
                .map(team -> new TeamProjectDTO(team.getTeamID(), team.getProject().getProjectID()))
                .toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/get-team/{projectId}")
    public ResponseEntity<List<Map<String, Object>>> getMemberDetailsByProjectId(
            @PathVariable int projectId,
            @RequestHeader("Authorization") String token) {

        List<Integer> memberIds = teamService.getTeamMemberIdsByProjectId(projectId);

        if (memberIds == null || memberIds.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Map<String, Object>> memberDetailsList = new ArrayList<>();

        for (Integer memberId : memberIds) {
            try {
                // Make a call to /users/{userId}
                String url = "http://localhost:8080/auth/users/" + memberId;

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", token);

                HttpEntity<Void> entity = new HttpEntity<>(headers);

                ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<Map<String, Object>>() {
                        });

                if (response.getStatusCode() == HttpStatus.OK) {
                    memberDetailsList.add(response.getBody());
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok(memberDetailsList);
    }
}
