package com.example.demo.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "TeamHasMember")
@IdClass(TeamHasMemberId.class)  
public class TeamHasMember {

    @Id
    @ManyToOne
    @JoinColumn(name = "teamID")
    private Team team;

    @Id
    @ManyToOne
    @JoinColumn(name = "memberID")
    private User user;

    public TeamHasMember() {}

    public TeamHasMember(Team team, User user) {
        this.team = team;
        this.user = user;
    }

    public Team getTeam() {
        return team;
    }

    public User getUser() {
        return user;
    }
}
