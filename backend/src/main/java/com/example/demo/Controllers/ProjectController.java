package com.example.demo.Controllers;

import com.example.demo.Models.Project;
import com.example.demo.Models.TaskList;
import com.example.demo.Services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // POST: Create a new project
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project,
            @RequestHeader("Authorization") String authHeader) {
        Project savedProject = projectService.createProject(project);
        String taskListApiUrl = "http://localhost:8080/lists";

        int projectID = savedProject.getProjectID();
        Map<String, Object> todoListRequest = Map.of("name", "To-Do", "projectID", projectID);
        Map<String, Object> doneListRequest = Map.of("name", "Done", "projectID", projectID);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);
        headers.set("Content-Type", "application/json");

        // Create HttpEntity with request body and headers
        HttpEntity<Map<String, Object>> todoEntity = new HttpEntity<>(todoListRequest, headers);
        HttpEntity<Map<String, Object>> doneEntity = new HttpEntity<>(doneListRequest, headers);

        ResponseEntity<TaskList> todoResponse = restTemplate.postForEntity(taskListApiUrl, todoEntity, TaskList.class);
        ResponseEntity<TaskList> doneResponse = restTemplate.postForEntity(taskListApiUrl, doneEntity, TaskList.class);

        HashMap<Integer, TaskList> taskLists = new HashMap<Integer, TaskList>();
        if (todoResponse.getBody() != null) {
            taskLists.put(todoResponse.getBody().getListID(), todoResponse.getBody());
        }
        if (doneResponse.getBody() != null) {
            taskLists.put(doneResponse.getBody().getListID(), doneResponse.getBody());
        }

        savedProject.setLists(taskLists);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    // GET: Get all projects
    @GetMapping
    public HashMap<Integer, Project> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();

        // Convert List to HashMap
        return new HashMap<>(projects.stream()
                .collect(Collectors.toMap(Project::getProjectID, project -> project)));
    }

    // GET: Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable int id,
            @RequestHeader("Authorization") String authHeader) {
        System.out.println("-------------------------------ENTERED: " + id);
        Optional<Project> projectOptional = projectService.getProjectById(id);

        if (projectOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();
        String taskListApiUrl = "http://localhost:8080/lists/project/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Fetch task lists from the task list service
        ResponseEntity<HashMap<Integer, TaskList>> taskListsResponse = restTemplate.exchange(
                taskListApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<HashMap<Integer, TaskList>>() {
                });

        if (taskListsResponse.getBody() != null) {
            HashMap<Integer, TaskList> taskLists = taskListsResponse.getBody();
            project.setLists(taskLists);
        }
        for (TaskList list : project.getLists().values()) {
            System.out.println("Here here");
            System.out.println("List ID: " + list.getListID() + ", Number of tasks: "
                    + (list.getTasks() != null ? list.getTasks().size() : "null"));
        }

        return ResponseEntity.ok(project);
    }

    // GET: Get projects by team lead ID (does not return the lists inside)
    @GetMapping("/teamlead/{teamLeadId}")
    public ResponseEntity<HashMap<Integer, Project>> getProjectsByTeamLead(@PathVariable int teamLeadId) {
        List<Project> projects = projectService.getProjectsByTeamLead(teamLeadId);

        if (projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Convert List to HashMap
        HashMap<Integer, Project> projectMap = new HashMap<>();
        for (Project project : projects) {
            projectMap.put(project.getProjectID(), project);
        }

        return ResponseEntity.ok(projectMap);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable int id,
            @RequestHeader("Authorization") String authHeader) {
        // Check if project exists
        Optional<Project> projectOptional = projectService.getProjectById(id);
        if (projectOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();

        projectService.deleteProject(id);
        return ResponseEntity.ok(project);
    }

}