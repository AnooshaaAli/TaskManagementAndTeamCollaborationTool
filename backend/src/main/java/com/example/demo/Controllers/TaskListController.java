package com.example.demo.Controllers;

import com.example.demo.Models.TaskList;
import com.example.demo.Models.Task;
import com.example.demo.Services.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;


import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/lists")
public class TaskListController {
    @Autowired
    private TaskListService taskListService;
    @Autowired
    private RestTemplate restTemplate;


    @PostMapping
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList) {
        TaskList savedTaskList = taskListService.saveTaskList(taskList);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable int id) {
        return taskListService.getTaskListById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllTaskLists() {
        return ResponseEntity.ok(taskListService.getAllTaskLists());
    }

    @GetMapping("/project/{projectID}")
    public ResponseEntity<HashMap<Integer, TaskList>> getTaskListsByProject(@PathVariable int projectID) {
        HashMap<Integer, TaskList> taskLists = taskListService.getTaskListsByProjectID(projectID);
        
        if (taskLists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Fetch tasks for each task list
        for (TaskList taskList : taskLists.values()) {
            String taskApiUrl = "http://localhost:8080/tasks/list/" + taskList.getListID();

            ResponseEntity<HashMap<Integer, Task>> taskResponse = restTemplate.exchange(
                    taskApiUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<HashMap<Integer, Task>>() {});
            

            if (taskResponse.getBody() != null && !taskResponse.getBody().isEmpty()) {
                taskList.setTasks(taskResponse.getBody());
            } else {
                taskList.setTasks(new HashMap<>()); // Set an empty HashMap if no tasks are found
            }
            System.out.println("List ID: " + taskList.getListID() + ", Number of tasks: " + (taskList.getTasks() != null ? taskList.getTasks().size() : "null"));

        }

        return ResponseEntity.ok(taskLists);
    }


    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable int id, @RequestBody TaskList updatedTaskList) {
        return taskListService.updateTaskList(id, updatedTaskList)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable int id) {
        if (taskListService.deleteTaskList(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/project/{projectID}")
    public ResponseEntity<Void> deleteTaskListsByProject(@PathVariable int projectID) {
        boolean deleted = taskListService.deleteTaskListsByProjectID(projectID);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



}
