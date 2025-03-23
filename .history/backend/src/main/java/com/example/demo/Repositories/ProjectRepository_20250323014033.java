package com.example.demo.Repositories;

import com.example.demo.Models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByTeamLeadID(int teamLeadId);
    Optional<Project> findById(Integer id); 
}
