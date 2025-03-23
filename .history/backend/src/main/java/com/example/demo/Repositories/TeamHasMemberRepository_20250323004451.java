package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Models.Team;
import com.example.demo.Models.TeamHasMember;
import com.example.demo.Models.TeamHasMemberId;
import com.example.demo.Models.User;

public interface TeamHasMemberRepository extends JpaRepository<TeamHasMember, TeamHasMemberId> {
    boolean existsByTeamAndUser(Team team, User user);
}
