package com.example.demo.controllers;

import com.example.demo.models.Task;
import com.example.demo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get a task by ID
    @GetMapping("/{taskID}")
    public Task getTaskById(@PathVariable int taskID) {
        return taskService.getTaskById(taskID);
    }

    // Update a task
    @PutMapping("/{taskID}")
    public Task updateTask(@PathVariable int taskID, @RequestBody Task updatedTask) {
        return taskService.updateTask(taskID, updatedTask);
    }

    // Delete a task
    @DeleteMapping("/{taskID}")
    public String deleteTask(@PathVariable int taskID) {
        boolean isDeleted = taskService.deleteTask(taskID);
        return isDeleted ? "Task deleted successfully" : "Task not found";
    }
}
