package com.example.demo.Controllers;

import com.example.demo.Models.Task;
import com.example.demo.Repositories.TaskListRepository;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.HashMap;
import com.example.demo.Models.TaskList;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskListRepository taskListRepository;

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
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            // Fetch the TaskList based on the listID
            TaskList taskList = taskListRepository.findById(task.getListID())
                    .orElseThrow(() -> new RuntimeException("Task list not found"));

            // Set the taskList to the Task object
            task.setTaskList(taskList);

            // If the deadline is "No deadline" or null, set it to null
            if ("No deadline".equals(task.getDeadline())) {
                task.setDeadline(null);
            }

            // Create and save the task
            Task createdTask = taskService.createTask(task);
            return ResponseEntity.ok(createdTask);

        } catch (Exception e) {
            // Handle error if the task creation fails
            return ResponseEntity.status(500).body(null);
        }
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

    // Get projectID of a task by taskID we don't need this anymore
    @GetMapping("/{taskID}/project")
    public ResponseEntity<Integer> getProjectIDByTaskID(@PathVariable int taskID) {
        Task task = taskService.getTaskById(taskID);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }

        TaskList taskList = taskListRepository.findById(task.getListID()).orElse(null);
        if (taskList == null) {
            return ResponseEntity.status(500).body(null); // Shouldn't happen, but safe fallback
        }

        return ResponseEntity.ok(taskList.getProjectID());
    }
}
