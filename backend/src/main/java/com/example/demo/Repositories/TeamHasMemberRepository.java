package com.example.demo.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Models.Team;
import com.example.demo.Models.TeamHasMember;
import com.example.demo.Models.TeamHasMemberId;
import com.example.demo.Models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamHasMemberRepository extends JpaRepository<TeamHasMember, TeamHasMemberId> {
    boolean existsByTeamAndUser(Team team, User user);

    Optional<TeamHasMember> findByTeamAndUser(Team team, User user);

    List<TeamHasMember> findByUser_userID(int userId);

    List<TeamHasMember> findByTeam(Team team);

}
