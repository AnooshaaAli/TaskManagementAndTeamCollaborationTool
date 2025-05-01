package com.example.demo.Controllers;

import com.example.demo.Models.Project;
import com.example.demo.Models.Files;
import com.example.demo.Models.TaskList;
import com.example.demo.Models.Comment;
import com.example.demo.Models.Team;
import com.example.demo.Services.ProjectService;
import com.example.demo.Services.TeamService;
import com.example.demo.dto.FileInfoDTO;
import com.example.demo.dto.TeamProjectDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;
    private static final Logger log = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private RestTemplate restTemplate;

    @Value("${backend.host}")
    private String backendHost;

    @Value("${backend.port}")
    private String backendPort;

    @Autowired
    public ProjectController(ProjectService projectService, TeamService teamService, RestTemplate restTemplate) {
        this.projectService = projectService;
        this.restTemplate = restTemplate;
    }

    // POST: Create a new project
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project,
            @RequestHeader("Authorization") String authHeader) {
        Project savedProject = projectService.createProject(project);
        String taskListApiUrl = "http://"+backendHost+":"+backendPort+"/lists";

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
        String taskListApiUrl = "http://"+backendHost+":"+backendPort+"/lists/project/" + id;

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
        String commentApiUrl = "http://"+backendHost+":"+backendPort+"/comments/" + id;

        ResponseEntity<List<Comment>> commentsResponse = restTemplate.exchange(
                commentApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Comment>>() {
                });

        if (commentsResponse.getBody() != null) {
            List<Comment> commentList = commentsResponse.getBody();
            HashMap<Integer, Comment> commentMap = new HashMap<>();

            for (Comment comment : commentList) {
                commentMap.put(comment.getCommentID(), comment);
            }

            project.setComments(commentMap);
        }

        String fileApiUrl = "http://"+backendHost+":"+backendPort+"/files/project/" + id;

        ResponseEntity<HashMap<Integer, FileInfoDTO>> filesResponse = restTemplate.exchange(
                fileApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<HashMap<Integer, FileInfoDTO>>() {
                });

        if (filesResponse.getBody() != null) {
            HashMap<Integer, FileInfoDTO> dtoMap = filesResponse.getBody();
            HashMap<Integer, Files> fileMap = new HashMap<>();

            for (Map.Entry<Integer, FileInfoDTO> entry : dtoMap.entrySet()) {
                FileInfoDTO dto = entry.getValue();
                Files file = new Files();
                file.setFileID(dto.getFileID());
                file.setFileName(dto.getFileName());
                fileMap.put(entry.getKey(), file);
            }

            project.setFiles(fileMap);
        }

        return ResponseEntity.ok(project);
    }

    // GET: Get projects by user ID (includes both team lead and member roles)
    @GetMapping("/user/{userId}")
    public ResponseEntity<HashMap<Integer, Project>> getProjectsByUserId(@PathVariable int userId,
            @RequestHeader("Authorization") String authHeader) {
        // Call the existing method to get the projects the user leads
        List<Project> leadProjects = projectService.getProjectsByTeamLead(userId);

        // Initialize a map to store all projects
        HashMap<Integer, Project> projectMap = new HashMap<>();

        // Add team lead projects to the map
        for (Project project : leadProjects) {
            projectMap.put(project.getProjectID(), project);
        }

        String teamUrl = "http://"+backendPort+":"+backendHost+"/api/team/user/" + userId;

        // Set the Authorization header for the API call
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        // Make the GET request to the TeamController for DTOs
        ResponseEntity<List<TeamProjectDTO>> teamsResponse = restTemplate.exchange(
                teamUrl,
                HttpMethod.GET,
                new org.springframework.http.HttpEntity<>(headers),
                new ParameterizedTypeReference<List<TeamProjectDTO>>() {
                });

        if (teamsResponse.getStatusCode().is2xxSuccessful()) {
            List<TeamProjectDTO> teams = teamsResponse.getBody();
            if (teams == null) {
                log.warn("No teams found for userId " + userId);
                teams = Collections.emptyList();
            }

            System.out.println("----------------------" + userId);
            System.out.println("Number of teams: " + teams.size());

            for (TeamProjectDTO team : teams) {
                System.out.println("Team id: " + team.getTeamID());
                System.out.println("Project id: " + team.getProjectID());
                Optional<Project> projectOptional = projectService.getProjectById(team.getProjectID());

                // If project exists, add it to the projectMap
                projectOptional.ifPresent(project -> {
                    System.out.println("Adding project with ID: " + project.getProjectID() + " to project map.");
                    projectMap.put(project.getProjectID(), project);
                });
            }
        }

        // If the user has no projects (either as a lead or member), return 204 No
        // Content
        if (projectMap.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Return the projects the user is part of (both lead and member)
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

        // Delete team via API
        String deleteTeamUrl = "http://"+backendHost+":8080/api/team/project/" + id;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        restTemplate.exchange(deleteTeamUrl, HttpMethod.DELETE, requestEntity, Void.class);
        // // Delete all associated task lists
        // String deleteTaskListsUrl = "http://localhost:8080/lists/project/" + id;
        // restTemplate.exchange(deleteTaskListsUrl, HttpMethod.DELETE, null,
        // Void.class);

        projectService.deleteProject(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/{projectId}/isTeamLead/{userId}")
    public ResponseEntity<Map<String, Boolean>> checkIfUserIsTeamLead(
            @PathVariable int projectId,
            @PathVariable int userId) {

        // Fetch the project by its ID
        Optional<Project> projectOptional = projectService.getProjectById(projectId);

        if (projectOptional.isEmpty()) {
            // If the project does not exist, return a NOT_FOUND response
            return ResponseEntity.notFound().build();
        }

        // Get the project object
        Project project = projectOptional.get();

        // Check if the userId matches the teamLeadID of the project
        boolean isTeamLead = project.getTeamLeadID() == userId;

        // Prepare the response map with the result
        Map<String, Boolean> response = new HashMap<>();
        response.put("isTeamLead", isTeamLead);

        // Return the response with HTTP OK status
        return ResponseEntity.ok(response);
    }

}