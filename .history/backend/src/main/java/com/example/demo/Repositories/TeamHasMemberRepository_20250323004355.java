package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamHasMemberRepository extends JpaRepository<TeamHasMember, TeamHasMemberId> {
    boolean existsByTeamAndUser(Team team, User user);
}
