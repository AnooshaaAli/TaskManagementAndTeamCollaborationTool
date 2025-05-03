package com.example.demo.Controllers;

import com.example.demo.Models.TaskList;
import com.example.demo.Models.Task;
import com.example.demo.Services.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.core.ParameterizedTypeReference;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lists")
public class TaskListController {
    @Autowired
    private TaskListService taskListService;
    @Autowired
    private RestTemplate restTemplate;

    @Value("${backend.host}")
    private String backendHost;

    @Value("${backend.port}")
    private String backendPort;

    @PostMapping
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList) {
        TaskList savedTaskList = taskListService.saveTaskList(taskList);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable int id,
            @RequestHeader("Authorization") String authHeader) {
        Optional<TaskList> optionalTaskList = taskListService.getTaskListById(id);

        if (optionalTaskList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        TaskList taskList = optionalTaskList.get();
        // Fetch tasks for this specific list
        String taskApiUrl = "http://" + backendHost + ":" + backendPort + "/tasks/list/" + taskList.getListID();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<HashMap<Integer, Task>> taskResponse = restTemplate.exchange(
                taskApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<HashMap<Integer, Task>>() {
                });

        if (taskResponse.getBody() != null && !taskResponse.getBody().isEmpty()) {
            taskList.setTasks(taskResponse.getBody());
        } else {
            taskList.setTasks(new HashMap<>()); // Set an empty HashMap if no tasks are found
        }

        return ResponseEntity.ok(taskList);
    }

    @GetMapping("/project/{projectID}")
    public ResponseEntity<HashMap<Integer, TaskList>> getTaskListsByProject(@PathVariable int projectID,
            @RequestHeader("Authorization") String authHeader) {
        HashMap<Integer, TaskList> taskLists = taskListService.getTaskListsByProjectID(projectID);

        if (taskLists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Fetch tasks for each task list
        for (TaskList taskList : taskLists.values()) {
            String taskApiUrl = "http://" + backendHost + ":" + backendPort + "/tasks/list/" +
                    taskList.getListID();

            ResponseEntity<HashMap<Integer, Task>> taskResponse = restTemplate.exchange(
                    taskApiUrl,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<HashMap<Integer, Task>>() {
                    });

            if (taskResponse.getBody() != null && !taskResponse.getBody().isEmpty()) {
                taskList.setTasks(taskResponse.getBody());
            } else {
                taskList.setTasks(new HashMap<>()); // Set an empty HashMap if no tasks are found
            }
            System.out.println("List ID: " + taskList.getListID() + ", Number of tasks: "
                    + (taskList.getTasks() != null ? taskList.getTasks().size() : "null"));
        }

        return ResponseEntity.ok(taskLists);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable int id,
            @RequestHeader("Authorization") String authHeader) {
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
