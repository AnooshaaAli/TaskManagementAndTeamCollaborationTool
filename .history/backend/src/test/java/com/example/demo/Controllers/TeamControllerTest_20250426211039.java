package com.example.demo.Controllers;

import com.example.demo.Models.Team;
import com.example.demo.Models.Project;
import com.example.demo.Services.TeamService;
import com.example.demo.dto.AddMemberRequest;
import com.example.demo.dto.RemoveMemberRequest;
import com.example.demo.dto.TeamProjectDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeamControllerTest {

    @Mock
    private TeamService teamService;

    @InjectMocks
    private TeamController teamController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddMember() {
        AddMemberRequest request = new AddMemberRequest();
        request.setSearchInput("testUser");
        request.setCurrentUserId(1);
        request.setProjectId(100);

        when(teamService.addMemberToProject("testUser", 1, 100))
                .thenReturn("Member added successfully");

        ResponseEntity<String> response = teamController.addMember(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Member added successfully", response.getBody());
    }

    @Test
    void testRemoveMemberFromTeam() {
        RemoveMemberRequest request = new RemoveMemberRequest();
        request.setSearchInput("testUser");
        request.setProjectId(100);

        Map<String, String> expectedResponse = Map.of("message", "Member removed successfully");

        when(teamService.removeMemberFromProject("testUser", 100))
                .thenReturn(ResponseEntity.ok(expectedResponse));

        ResponseEntity<Map<String, String>> response = teamController.removeMemberFromTeam(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Member removed successfully", response.getBody().get("message"));
    }

    @Test
    void testDeleteTeamByProjectId() {
        int projectId = 100;

        ResponseEntity<Void> response = teamController.deleteTeamByProjectId(projectId);

        verify(teamService, times(1)).deleteByProjectId(projectId);
        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void testGetTeamAndProjectIDByUserId() {
        int userId = 1;

        Team team1 = new Team();
        team1.setTeamID(10);
        Project project1 = new Project();
        project1.setProjectID(100);
        team1.setProject(project1);

        Team team2 = new Team();
        team2.setTeamID(20);
        Project project2 = new Project();
        project2.setProjectID(200);
        team2.setProject(project2);

        when(teamService.getTeamsByUserId(userId)).thenReturn(Arrays.asList(team1, team2));

        ResponseEntity<List<TeamProjectDTO>> response = teamController.getTeamAndProjectIDByUserId(userId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals(10, response.getBody().get(0).getTeamID());
        assertEquals(100, response.getBody().get(0).getProjectId());
        assertEquals(20, response.getBody().get(1).getTeamID());
        assertEquals(200, response.getBody().get(1).getProjectId());
    }
}
