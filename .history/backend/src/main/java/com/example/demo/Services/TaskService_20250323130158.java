package com.example.demo.Services;

import com.example.demo.Models.Task;
import com.example.demo.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public HashMap<Integer, Task> getTasksByListID(int listID) {
        List<Task> taskList = taskRepository.findByListID(listID); // Fetch list of tasks

        HashMap<Integer, Task> taskMap = new HashMap<>();
        for (Task task : taskList) {
            taskMap.put(task.getTaskID(), task); // Convert List to HashMap
        }

        return taskMap;
    }
    
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
        Optional<Task> optionalTask = taskRepository.findById(taskID);
        if (!optionalTask.isPresent()) {
            return null; // Task not found
        }
    
        Task existingTask = optionalTask.get();
        
        // Preserve the existing taskList reference
        updatedTask.setTaskList(existingTask.getTaskList());
    
        // Update only necessary fields
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setDeadline(updatedTask.getDeadline());
    
        return taskRepository.save(existingTask); // Save the updated task
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
