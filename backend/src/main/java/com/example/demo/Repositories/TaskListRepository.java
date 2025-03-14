package com.example.demo.Repositories;

import com.example.demo.Models.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Integer> {
    List<TaskList> findByProjectID(int projectID);
}