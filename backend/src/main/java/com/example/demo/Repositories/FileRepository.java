package com.example.demo.Repositories;

import com.example.demo.Models.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<Files, Integer> {

    // Find all files related to a specific project
    List<Files> findByProjectID(Integer projectID);
}