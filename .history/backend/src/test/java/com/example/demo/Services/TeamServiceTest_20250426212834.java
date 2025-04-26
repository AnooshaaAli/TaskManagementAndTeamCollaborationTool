package com.example.demo.Services;

import com.example.demo.Models.*;
import com.example.demo.Repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeamServiceTest {

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private TeamHasMemberRepository teamHasMemberRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private TeamService teamService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddMemberToProject_UserNotFound() {
        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.empty());
        when(userRepository.findById(anyInt())).thenReturn(Optional.empty());  // Add this mock for current user
    
        String result = teamService.addMemberToProject("searchInput", 1, 1);
        assertEquals("User with this email/username does not exist.", result);
    }    

    @Test
    void testAddMemberToProject_UserAlreadyMember() {
        User currentUser = new User();
        currentUser.setUserID(1);

        User newMember = new User();
        newMember.setUserID(2);

        Project project = new Project();
        project.setProjectID(1);
        project.setName("Test Project");

        Team team = new Team();
        team.setTeamID(1);
        team.setProject(project);

        when(userRepository.findById(anyInt())).thenReturn(Optional.of(currentUser));
        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.of(newMember));
        when(projectRepository.findById(anyInt())).thenReturn(Optional.of(project));
        when(teamRepository.findByProject(any())).thenReturn(team);
        when(teamHasMemberRepository.existsByTeamAndUser(any(), any())).thenReturn(true);

        String result = teamService.addMemberToProject("searchInput", 1, 1);

        assertEquals("User is already a member of this team.", result);
    }

    @Test
    void testAddMemberToProject_Success() {
        User currentUser = new User();
        currentUser.setUserID(1);

        User newMember = new User();
        newMember.setUserID(2);

        Project project = new Project();
        project.setProjectID(1);
        project.setName("Test Project");

        Team team = new Team();
        team.setTeamID(1);
        team.setProject(project);

        when(userRepository.findById(anyInt())).thenReturn(Optional.of(currentUser));
        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.of(newMember));
        when(projectRepository.findById(anyInt())).thenReturn(Optional.of(project));
        when(teamRepository.findByProject(any())).thenReturn(team);
        when(teamHasMemberRepository.existsByTeamAndUser(any(), any())).thenReturn(false);

        String result = teamService.addMemberToProject("searchInput", 1, 1);

        assertEquals("User successfully added to the team.", result);
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    void testRemoveMemberFromProject_UserNotFound() {
        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.empty());

        ResponseEntity<Map<String, String>> response = teamService.removeMemberFromProject("searchInput", 1);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("User not found.", response.getBody().get("message"));
    }

    @Test
    void testRemoveMemberFromProject_TeamLeadCannotRemoveThemselves() {
        User teamLead = new User();
        teamLead.setUserID(1);

        Project project = new Project();
        project.setProjectID(1);
        project.setTeamLeadID(1);

        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.of(teamLead));
        when(projectRepository.findById(anyInt())).thenReturn(Optional.of(project));

        ResponseEntity<Map<String, String>> response = teamService.removeMemberFromProject("searchInput", 1);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Team lead cannot remove themselves from the team.", response.getBody().get("message"));
    }

    @Test
    void testRemoveMemberFromProject_UserNotMember() {
        User user = new User();
        user.setUserID(2);

        Project project = new Project();
        project.setProjectID(1);
        project.setTeamLeadID(1);

        Team team = new Team();
        team.setProject(project);

        when(userRepository.findByAccount_EmailOrAccount_Username(anyString(), anyString())).thenReturn(Optional.of(user));
        when(projectRepository.findById(anyInt())).thenReturn(Optional.of(project));
        when(teamRepository.findByProject(any())).thenReturn(team);
        when(teamHasMemberRepository.findByTeamAndUser(any(), any())).thenReturn(Optional.empty());

        ResponseEntity<Map<String, String>> response = teamService.removeMemberFromProject("searchInput", 1);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("User is not a member of this team.", response.getBody().get("message"));
    }

    @Test
    void testRemoveMemberFromProject_Success() {
        // Mock user data
        User user = new User();
        user.setUserID(2);
    
        Project project = new Project();
        project.setProjectID(1);
        project.setTeamLeadID(1); // Ensure that the team lead is set
    
        Team team = new Team();
        team.setProject(project);
    
        TeamHasMember teamHasMember = new TeamHasMember();
        teamHasMember.setUser(user);
        teamHasMember.setTeam(team);
    
        User currentUser = new User();
        currentUser.setUserID(1); // Set the current user to the team lead
    
        // Mock repository behavior
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(currentUser));
        when(projectRepository.findById(anyInt())).thenReturn(Optional.of(project));
        when(teamRepository.findByProject(any())).thenReturn(team);
        when(teamHasMemberRepository.findByTeamAndUser(any(), any())).thenReturn(Optional.of(teamHasMember));
    
        // Run the service method
        ResponseEntity<Map<String, String>> response = teamService.removeMemberFromProject("searchInput", 1);
    
        // Check the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User successfully removed from the team.", response.getBody().get("message"));
    }    

    @Test
    void testDeleteByProjectId() {
        doNothing().when(teamRepository).deleteByProjectId(anyInt());

        teamService.deleteByProjectId(1);

        verify(teamRepository, times(1)).deleteByProjectId(1);
    }

    @Test
    void testGetTeamsByUserId() {
        int userId = 1;
        Team team1 = new Team();
        team1.setTeamID(1);
        
        Project project = new Project();
        project.setProjectID(1);
        team1.setProject(project);
        
        TeamHasMember teamHasMember = new TeamHasMember();
        teamHasMember.setTeam(team1);

        when(teamHasMemberRepository.findByUser_userID(userId)).thenReturn(List.of(teamHasMember));

        List<Team> teams = teamService.getTeamsByUserId(userId);

        assertEquals(1, teams.size());
        assertEquals(1, teams.get(0).getTeamID());
        assertNotNull(teams.get(0).getProject());
    }

    @Test
    void testIsUserInTeamForProject() {
        when(teamRepository.isUserInTeamForProject(1, 1)).thenReturn(true);

        boolean result = teamService.isUserInTeamForProject(1, 1);

        assertTrue(result);
    }
}
