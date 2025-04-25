package com.example.demo.Services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.demo.Models.Project;
import com.example.demo.Repositories.ProjectRepository;

public class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProject() {
        // Arrange
        Project input = new Project();
        input.setName("Test Project");

        Project saved = new Project();
        saved.setProjectID(1);
        saved.setName("Test Project");

        when(projectRepository.save(input)).thenReturn(saved);

        // Act
        Project result = projectService.createProject(input);

        // Assert
        assertEquals(saved.getProjectID(), result.getProjectID());
        assertEquals(saved.getName(), result.getName());

        verify(projectRepository, times(1)).save(input);
    }

    @Test
    void testDeleteProject() {
        // Arrange
        int projectId = 1;

        // Act
        projectService.deleteProject(projectId);

        // Assert
        verify(projectRepository, times(1)).deleteById(projectId);
    }

    @Test
    void testGetProjectById() {
        // Arrange
        int projectId = 1;
        Project mockProject = new Project();
        mockProject.setProjectID(projectId);
        mockProject.setName("Mock Project");

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(mockProject));

        // Act
        Optional<Project> result = projectService.getProjectById(projectId);

        // Assert
        assertEquals(true, result.isPresent());
        assertEquals("Mock Project", result.get().getName());
        assertEquals(projectId, result.get().getProjectID());
        verify(projectRepository, times(1)).findById(projectId);
    }

}
