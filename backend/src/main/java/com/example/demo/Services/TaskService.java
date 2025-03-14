package com.example.demo.Services;

import com.example.demo.Models.Task;
import com.example.demo.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get a task by ID
    public Task getTaskById(int taskID) {
        Optional<Task> task = taskRepository.findById(taskID);
        return task.orElse(null); // Return task if found, otherwise return null
    }

    // Update a task
    public Task updateTask(int taskID, Task updatedTask) {
        if (taskRepository.existsById(taskID)) {
            updatedTask.setTaskID(taskID); // Ensure the correct ID is set
            return taskRepository.save(updatedTask);
        }
        return null; // Return null if task not found
    }

    // Delete a task by ID
    public boolean deleteTask(int taskID) {
        if (taskRepository.existsById(taskID)) {
            taskRepository.deleteById(taskID);
            return true;
        }
        return false; // Task not found
    }
}
