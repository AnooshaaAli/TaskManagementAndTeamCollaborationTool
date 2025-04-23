package com.example.demo.Services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

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
}
