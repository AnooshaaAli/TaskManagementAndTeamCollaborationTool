package com.example.demo.Services;

import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String removeMemberFromProject(int userId, int projectId) {
        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find the project
        Project project = ProjectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Find the team associated with the project
        Team team = teamRepository.findByProject(project);
        if (team == null) {
            return "No team exists for this project.";
        }

        // Check if the user is a member of the team
        boolean teamMemberOptional = teamHasMemberRepository.existsByTeamAndUser(team, user);
        if (teamMemberOptional.isEmpty()) {
            return "User is not a member of this team.";
        }

        // Remove the user from the team
        teamHasMemberRepository.delete(teamMemberOptional.get());

        return "User successfully removed from the team.";
    }
}
