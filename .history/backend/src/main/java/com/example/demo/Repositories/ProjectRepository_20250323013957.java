package com.example.demo.Repositories;

import com.example.demo.Models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByTeamLeadID(int teamLeadId);
    
}
