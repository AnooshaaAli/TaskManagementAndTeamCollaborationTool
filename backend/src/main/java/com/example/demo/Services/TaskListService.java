package com.example.demo.Services;

import com.example.demo.Models.TaskList;
import com.example.demo.Repositories.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;

    @Autowired
    public TaskListService(TaskListRepository taskRepository) {
        this.taskListRepository = taskRepository;
    }

    public TaskList createTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public List<TaskList> getAllTaskLists() {
        return taskListRepository.findAll();
    }

    public Optional<TaskList> getTaskListById(int id) {
        return taskListRepository.findById(id);
    }
}
