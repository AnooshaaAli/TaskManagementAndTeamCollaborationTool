package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Models.Project;
import com.example.demo.Models.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByProject(Project project);
}
