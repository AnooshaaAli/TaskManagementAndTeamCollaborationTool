package com.example.demo.Controllers;

import com.example.demo.Models.Task;
import com.example.demo.Models.TaskList;
import com.example.demo.Services.TaskService;
import com.example.demo.Repositories.TaskListRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @Mock
    private TaskListRepository taskListRepository;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTasksByListID_returnsTasks() {
        int listID = 1;

        Task task1 = new Task();
        task1.setTaskID(101);
        Task task2 = new Task();
        task2.setTaskID(102);

        HashMap<Integer, Task> mockMap = new HashMap<>();
        mockMap.put(task1.getTaskID(), task1);
        mockMap.put(task2.getTaskID(), task2);

        when(taskService.getTasksByListID(listID)).thenReturn(mockMap);

        ResponseEntity<HashMap<Integer, Task>> response = taskController.getTasksByListID(listID);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        verify(taskService, times(1)).getTasksByListID(listID);
    }

    @Test
    public void testCreateTask_successful() {
        Task task = new Task();
        task.setListID(1);
        task.setDeadline(null);

        TaskList list = new TaskList();
        list.setListID(1);

        when(taskListRepository.findById(1)).thenReturn(Optional.of(list));
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        ResponseEntity<Task> response = taskController.createTask(task);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertNull(response.getBody().getDeadline()); // deadline should be null
        verify(taskService, times(1)).createTask(any(Task.class));
    }

    @Test
    public void testCreateTask_listNotFound() {
        Task task = new Task();
        task.setListID(1);

        when(taskListRepository.findById(1)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.createTask(task);

        assertEquals(500, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    public void testGetAllTasks() {
        List<Task> mockTasks = Arrays.asList(new Task(), new Task());

        when(taskService.getAllTasks()).thenReturn(mockTasks);

        List<Task> result = taskController.getAllTasks();

        assertEquals(2, result.size());
        verify(taskService).getAllTasks();
    }

    @Test
    public void testGetTaskById() {
        Task mockTask = new Task();
        when(taskService.getTaskById(1)).thenReturn(mockTask);

        Task result = taskController.getTaskById(1);

        assertEquals(mockTask, result);
        verify(taskService).getTaskById(1);
    }

    @Test
    public void testUpdateTask() {
        Task updated = new Task();
        updated.setTitle("Updated Task");

        when(taskService.updateTask(eq(1), any(Task.class))).thenReturn(updated);

        Task result = taskController.updateTask(1, updated);

        assertEquals("Updated Task", result.getTitle());
        verify(taskService).updateTask(1, updated);
    }

    @Test
    public void testDeleteTask_success() {
        when(taskService.deleteTask(1)).thenReturn(true);

        String result = taskController.deleteTask(1);

        assertEquals("Task deleted successfully", result);
    }

    @Test
    public void testDeleteTask_notFound() {
        when(taskService.deleteTask(1)).thenReturn(false);

        String result = taskController.deleteTask(1);

        assertEquals("Task not found", result);
    }

    @Test
    public void testGetProjectIDByTaskID() {
        Task task = new Task();
        task.setListID(5);

        TaskList list = new TaskList();
        list.setProjectID(99);

        when(taskService.getTaskById(1)).thenReturn(task);
        when(taskListRepository.findById(5)).thenReturn(Optional.of(list));

        ResponseEntity<Integer> response = taskController.getProjectIDByTaskID(1);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(99, response.getBody());
    }

    @Test
    public void testGetProjectIDByTaskID_notFound() {
        when(taskService.getTaskById(1)).thenReturn(null);

        ResponseEntity<Integer> response = taskController.getProjectIDByTaskID(1);

        assertEquals(404, response.getStatusCodeValue());
    }
}
