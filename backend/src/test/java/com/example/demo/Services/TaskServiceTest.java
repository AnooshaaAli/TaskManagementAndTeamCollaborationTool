package com.example.demo.Services;

import com.example.demo.Models.Task;
import com.example.demo.Repositories.TaskRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTask() {
        Task input = new Task("Task Title", new Date(), "ToDo", 1);
        Task saved = new Task("Task Title", new Date(), "ToDo", 1);
        saved.setTaskID(1);

        when(taskRepository.save(input)).thenReturn(saved);

        Task result = taskService.createTask(input);

        assertEquals(1, result.getTaskID());
        assertEquals("Task Title", result.getTitle());
        verify(taskRepository, times(1)).save(input);
    }

    @Test
    void testGetAllTasks() {
        List<Task> taskList = Arrays.asList(
                new Task("Task 1", new Date(), "ToDo", 1),
                new Task("Task 2", new Date(), "Done", 1)
        );

        when(taskRepository.findAll()).thenReturn(taskList);

        List<Task> result = taskService.getAllTasks();
        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById_Found() {
        Task task = new Task("My Task", new Date(), "ToDo", 1);
        task.setTaskID(1);

        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1);
        assertNotNull(result);
        assertEquals("My Task", result.getTitle());
    }

    @Test
    void testGetTaskById_NotFound() {
        when(taskRepository.findById(99)).thenReturn(Optional.empty());

        Task result = taskService.getTaskById(99);
        assertNull(result);
    }

    @Test
    void testUpdateTask_Found() {
        Task existing = new Task("Old Task", new Date(), "ToDo", 1);
        existing.setTaskID(1);

        Task updated = new Task("Updated Task", new Date(), "In Progress", 1);

        when(taskRepository.findById(1)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenReturn(existing);

        Task result = taskService.updateTask(1, updated);

        assertNotNull(result);
        assertEquals("Updated Task", result.getTitle());
        assertEquals("In Progress", result.getStatus());
    }

    @Test
    void testUpdateTask_NotFound() {
        Task updated = new Task("Updated Task", new Date(), "In Progress", 1);
        when(taskRepository.findById(42)).thenReturn(Optional.empty());

        Task result = taskService.updateTask(42, updated);
        assertNull(result);
    }

    @Test
    void testDeleteTask_Exists() {
        when(taskRepository.existsById(1)).thenReturn(true);

        boolean result = taskService.deleteTask(1);

        assertTrue(result);
        verify(taskRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteTask_NotExists() {
        when(taskRepository.existsById(99)).thenReturn(false);

        boolean result = taskService.deleteTask(99);

        assertFalse(result);
        verify(taskRepository, never()).deleteById(anyInt());
    }

    @Test
    void testGetTasksByListID() {
        Task t1 = new Task("Task A", new Date(), "ToDo", 1);
        t1.setTaskID(1);
        Task t2 = new Task("Task B", new Date(), "Done", 1);
        t2.setTaskID(2);

        List<Task> mockList = Arrays.asList(t1, t2);

        when(taskRepository.findByListID(1)).thenReturn(mockList);

        Map<Integer, Task> result = taskService.getTasksByListID(1);

        assertEquals(2, result.size());
        assertEquals("Task A", result.get(1).getTitle());
        assertEquals("Task B", result.get(2).getTitle());
    }
}
