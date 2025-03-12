package com.example.demo.Controllers;

import com.example.demo.Models.Project;
import com.example.demo.Services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // POST: Create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
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
    public Optional<Project> getProjectById(@PathVariable int id) {
        return projectService.getProjectById(id);
    }
}