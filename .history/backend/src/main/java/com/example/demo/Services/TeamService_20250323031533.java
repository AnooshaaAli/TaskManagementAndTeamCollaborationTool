package com.example.demo.Services;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Models.Project;
import com.example.demo.Models.Team;
import com.example.demo.Models.TeamHasMember;
import com.example.demo.Models.User;
import com.example.demo.Repositories.ProjectRepository;
import com.example.demo.Repositories.TeamHasMemberRepository;
import com.example.demo.Repositories.TeamRepository;
import com.example.demo.Repositories.UserRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamHasMemberRepository teamHasMemberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository ProjectRepository; 

    @Transactional
    public String addMemberToProject(String searchInput, int currentUserId, int projectId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        Optional<User> userOptional = userRepository.findByAccount_EmailOrAccount_Username(searchInput, searchInput);
        if (userOptional.isEmpty()) {
            return "User with this email/username does not exist.";
        }

        User newMember = userOptional.get();

        Project project = ProjectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        Team team = teamRepository.findByProject(project);
        
        if (team == null) {
            team = new Team();
            team.setProjectId(projectId);
            team = teamRepository.save(team);

            // Insert both the current user and the searched user
            teamHasMemberRepository.save(new TeamHasMember(team, currentUser));
        }

        // Check if the member already exists
        if (teamHasMemberRepository.existsByTeamAndUser(team, newMember)) {
            return "User is already a member of this team.";
        }

        // Add the searched user to the team
        teamHasMemberRepository.save(new TeamHasMember(team, newMember));
        return "User successfully added to the team.";
    }

    @Transactional
    public ResponseEntity<Map<String, String>> removeMemberFromProject(String searchInput, int projectId) {
        // Find the user by email or username
        Optional<User> userOptional = userRepository.findByAccount_EmailOrAccount_Username(searchInput, searchInput);
        
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "User with this email/username does not exist."));
        }
    
        User userToRemove = userOptional.get();
    
        // Find the project
        Project project = ProjectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    
        // Find the team linked to the project
        Team team = teamRepository.findByProject(project);
        
        if (team == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "No team exists for this project."));
        }
    
        // Find the team-member relationship
        Optional<TeamHasMember> teamMemberOptional = teamHasMemberRepository.findByTeamAndUser(team, userToRemove);
        
        if (teamMemberOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "User is not a member of this team."));
        }
    
        // Remove the member from the team
        teamHasMemberRepository.delete(teamMemberOptional.get());
    
        return ResponseEntity.ok(Collections.singletonMap("message", "User successfully removed from the team."));
    }    
}
