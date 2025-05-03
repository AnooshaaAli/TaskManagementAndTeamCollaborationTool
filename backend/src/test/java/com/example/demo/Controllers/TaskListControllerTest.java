package com.example.demo.Controllers;

import com.example.demo.Models.Task;
import com.example.demo.Models.TaskList;
import com.example.demo.Services.TaskListService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class TaskListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private TaskListController taskListController;

    @Mock
    private TaskListService taskListService;

    @Mock
    private RestTemplate restTemplate;

    private ObjectMapper objectMapper = new ObjectMapper();

    private static final String AUTH_HEADER = "Bearer faketoken";

    @Value("${backend.host}")
    private String backendHost;

    @Value("${backend.port}")
    private String backendPort;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTaskList() {
        // Arrange
        TaskList input = new TaskList();
        input.setListID(1);
        input.setName("Test TaskList");

        TaskList saved = new TaskList();
        saved.setListID(1);
        saved.setName("Test TaskList");

        when(taskListService.saveTaskList(input)).thenReturn(saved);

        // Act
        ResponseEntity<TaskList> response = taskListController.createTaskList(input);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(saved.getListID(), response.getBody().getListID());
        assertEquals("Test TaskList", response.getBody().getName());

        verify(taskListService, times(1)).saveTaskList(input);
    }

    @Test
    void testGetTaskListsByProject_success() {
        // Arrange
        int projectId = 1;

        TaskList mockTaskList = new TaskList();
        mockTaskList.setListID(1);
        mockTaskList.setName("Test Task List");

        HashMap<Integer, TaskList> taskLists = new HashMap<>();
        taskLists.put(1, mockTaskList);

        // Mock TaskList service
        when(taskListService.getTaskListsByProjectID(projectId)).thenReturn(taskLists);

        // Mock the task fetching API call
        HashMap<Integer, Task> mockTaskMap = new HashMap<>();
        Task mockTask = new Task();
        mockTask.setTaskID(1);
        mockTask.setTitle("Test Task");

        mockTaskMap.put(1, mockTask);

        // Mock the RestTemplate.exchange to return a valid response with tasks
        ResponseEntity<HashMap<Integer, Task>> taskResponseEntity = new ResponseEntity<>(mockTaskMap, HttpStatus.OK);
        when(restTemplate.exchange(
                eq("http://"+backendHost+":"+backendPort+"/tasks/list/" + mockTaskList.getListID()),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                ArgumentMatchers.<ParameterizedTypeReference<HashMap<Integer, Task>>>any()))
                .thenReturn(taskResponseEntity);

        // Act
        ResponseEntity<HashMap<Integer, TaskList>> response = taskListController.getTaskListsByProject(projectId,
                AUTH_HEADER);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isEmpty());
        assertEquals("Test Task List", response.getBody().get(1).getName());
        assertNotNull(response.getBody().get(1).getTasks());
        assertFalse(response.getBody().get(1).getTasks().isEmpty());
        assertEquals("Test Task", response.getBody().get(1).getTasks().get(1).getTitle());
    }

    @Test
    void testGetTaskListsByProject_noContent() {
        // Arrange
        int projectID = 123;
        HashMap<Integer, TaskList> taskLists = new HashMap<>();
        when(taskListService.getTaskListsByProjectID(projectID)).thenReturn(taskLists);

        // Act
        ResponseEntity<HashMap<Integer, TaskList>> response = taskListController.getTaskListsByProject(projectID,
                AUTH_HEADER);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(taskListService, times(1)).getTaskListsByProjectID(projectID);
    }

    @Test
    void testDeleteTaskList_success() {
        // Arrange
        int taskListID = 1;
        when(taskListService.deleteTaskList(taskListID)).thenReturn(true);

        // Act
        ResponseEntity<Void> response = taskListController.deleteTaskList(taskListID, AUTH_HEADER);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(taskListService, times(1)).deleteTaskList(taskListID);
    }

    @Test
    void testDeleteTaskList_notFound() {
        // Arrange
        int taskListID = 1;
        when(taskListService.deleteTaskList(taskListID)).thenReturn(false);

        // Act
        ResponseEntity<Void> response = taskListController.deleteTaskList(taskListID, AUTH_HEADER);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(taskListService, times(1)).deleteTaskList(taskListID);
    }

    @Test
    void testDeleteTaskListsByProject_success() {
        // Arrange
        int projectID = 123;
        when(taskListService.deleteTaskListsByProjectID(projectID)).thenReturn(true);

        // Act
        ResponseEntity<Void> response = taskListController.deleteTaskListsByProject(projectID);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(taskListService, times(1)).deleteTaskListsByProjectID(projectID);
    }

    @Test
    void testDeleteTaskListsByProject_notFound() {
        // Arrange
        int projectID = 123;
        when(taskListService.deleteTaskListsByProjectID(projectID)).thenReturn(false);

        // Act
        ResponseEntity<Void> response = taskListController.deleteTaskListsByProject(projectID);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(taskListService, times(1)).deleteTaskListsByProjectID(projectID);
    }
}
