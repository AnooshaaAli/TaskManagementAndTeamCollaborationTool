package com.example.demo.Controllers;

import com.example.demo.Models.Task;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.HashMap;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get tasks by listID and return as HashMap
    @GetMapping("/list/{listID}")
    public ResponseEntity<HashMap<Integer, Task>> getTasksByListID(@PathVariable int listID) {
        HashMap<Integer, Task> taskMap = taskService.getTasksByListID(listID);

        if (taskMap.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(taskMap);
    }

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
