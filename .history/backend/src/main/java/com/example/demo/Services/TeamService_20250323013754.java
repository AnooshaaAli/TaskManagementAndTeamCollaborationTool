package com.example.demo.Services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Models.Team;
import com.example.demo.Models.TeamHasMember;
import com.example.demo.Models.User;
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

    @Transactional
    public String addMemberToProject(String searchInput, int currentUserId, Long projectId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        User newMember = userRepository.findByAccount_EmailOrAccount_Username(searchInput, searchInput)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepository.findById(projectId)
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
}
