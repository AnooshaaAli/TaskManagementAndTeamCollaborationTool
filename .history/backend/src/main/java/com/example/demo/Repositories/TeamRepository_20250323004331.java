package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByProjectId(Long projectId);
}
