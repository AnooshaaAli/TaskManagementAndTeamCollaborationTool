package com.example.demo.Services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

            teamHasMemberRepository.save(new TeamHasMember(team, currentUser));
        }

        if (teamHasMemberRepository.existsByTeamAndUser(team, newMember)) {
            return "User is already a member of this team.";
        }

        teamHasMemberRepository.save(new TeamHasMember(team, newMember));
        return "User successfully added to the team.";
    }

    @Transactional
    public ResponseEntity<Map<String, String>> removeMemberFromProject(String searchInput, int projectId, int currentUserId) {
        Map<String, String> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findByAccount_EmailOrAccount_Username(searchInput, searchInput);
        if (userOptional.isEmpty()) {
            response.put("message", "User not found.");
            return ResponseEntity.badRequest().body(response);
        }

        User userToRemove = userOptional.get();

        Project project = ProjectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Team team = teamRepository.findByProject(project);
        if (team == null) {
            response.put("message", "Team not found.");
            return ResponseEntity.badRequest().body(response);
        }

    // 🛡️ Check if userToRemove is the team lead
    if (team.getTeamLead() != null && team.getTeamLead().getUserID() == userToRemove.getUserID()) {
        response.put("message", "Team lead cannot remove themselves from the team.");
        return ResponseEntity.badRequest().body(response);
    }

        Optional<TeamHasMember> teamMember = teamHasMemberRepository.findByTeamAndUser(team, userToRemove);
        if (teamMember.isEmpty()) {
            response.put("message", "User is not a member of this team.");
            return ResponseEntity.badRequest().body(response);
        }

        teamHasMemberRepository.delete(teamMember.get());
        response.put("message", "User successfully removed from the team.");
        return ResponseEntity.ok(response);
    }

    @Transactional
    public void deleteByProjectId(int projectId) {
        teamRepository.deleteByProjectId(projectId);
    }

    public List<Team> getTeamsByUserId(int userId) {
        // Fetch all TeamHasMember entries for the user
        List<TeamHasMember> teamHasMembers = teamHasMemberRepository.findByUser_userID(userId);

        // Create a list to store the teams
        List<Team> teams = new ArrayList<>();

        // Iterate over TeamHasMember entries and add the associated teams to the list
        for (TeamHasMember teamHasMember : teamHasMembers) {
            teams.add(teamHasMember.getTeam());
        }

        return teams;
    }

}
