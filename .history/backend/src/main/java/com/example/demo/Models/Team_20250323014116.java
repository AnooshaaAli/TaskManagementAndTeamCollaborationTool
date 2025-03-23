package com.example.demo.Models;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private Set<TeamHasMember> members = new HashSet<>();

    public Team() {}

    public Team(Project project) {
        this.project = project;
    }

    public Long getTeamID() { return teamID; }
    public Project getProject() { return project; }
    public Set<TeamHasMember> getMembers() { return members; }

    public void setProjectId(int projectId) {
        
    }
}
