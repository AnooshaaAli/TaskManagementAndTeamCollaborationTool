package com.example.demo.Repositories;

import com.example.demo.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    // JpaRepository provides built-in CRUD methods, no need to manually implement
    // them
    List<Task> findByListID(int listID);
}
