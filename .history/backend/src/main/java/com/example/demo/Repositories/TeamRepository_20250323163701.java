package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Models.Project;
import com.example.demo.Models.Team;

import jakarta.transaction.Transactional;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findByProject(Project project);
    @Modifying
    @Transactional
    @Query("DELETE FROM Team t WHERE t.project.id = :projectId")
    void deleteByProjectId(@Param("projectId") int projectId);
}
