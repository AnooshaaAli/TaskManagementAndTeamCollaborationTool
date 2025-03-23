package com.example.demo.Controllers;

import com.example.demo.Models.Project;
import com.example.demo.Models.TaskList;
import com.example.demo.Services.ProjectService;
import com.example.demo.Services.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
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
    private final TeamService teamService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // POST: Create a new project
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectService.createProject(project);
        String taskListApiUrl = "http://localhost:8080/lists";

        int projectID = savedProject.getProjectID();
        Map<String, Object> todoListRequest = Map.of("name", "To-Do", "projectID", projectID);
        Map<String, Object> doneListRequest = Map.of("name", "Done", "projectID", projectID);

        ResponseEntity<TaskList> todoResponse = restTemplate.postForEntity(taskListApiUrl, todoListRequest,
                TaskList.class);
        ResponseEntity<TaskList> doneResponse = restTemplate.postForEntity(taskListApiUrl, doneListRequest,
                TaskList.class);

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
    public ResponseEntity<Project> getProjectById(@PathVariable int id) {
        Optional<Project> projectOptional = projectService.getProjectById(id);

        if (projectOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();
        String taskListApiUrl = "http://localhost:8080/lists/project/" + id;

        // Fetch task lists from the task list service
        ResponseEntity<HashMap<Integer, TaskList>> taskListsResponse = restTemplate.exchange(
                taskListApiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<HashMap<Integer, TaskList>>() {
                });

        if (taskListsResponse.getBody() != null) {
            HashMap<Integer, TaskList> taskLists = taskListsResponse.getBody();
            project.setLists(taskLists);
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
    public ResponseEntity<Project> deleteProject(@PathVariable int id) {
        // Check if project exists
        Optional<Project> projectOptional = projectService.getProjectById(id);
        if (projectOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();

        teamService.deleteByProjectId(id);

        // // Delete all associated task lists
        // String deleteTaskListsUrl = "http://localhost:8080/lists/project/" + id;
        // restTemplate.exchange(deleteTaskListsUrl, HttpMethod.DELETE, null, Void.class);

        projectService.deleteProject(id);
        return ResponseEntity.ok(project);
    }

}