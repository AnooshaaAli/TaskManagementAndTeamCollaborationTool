package com.example.demo.Services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import java.util.*;

import com.example.demo.Models.TaskList;
import com.example.demo.Repositories.TaskListRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class TaskListServiceTest {

    @Mock
    private TaskListRepository taskListRepository;

    @InjectMocks
    private TaskListService taskListService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveTaskList() {
        // Arrange
        TaskList input = new TaskList();
        input.setName("Test List");

        TaskList saved = new TaskList();
        saved.setListID(1);
        saved.setName("Test List");

        when(taskListRepository.save(input)).thenReturn(saved);

        // Act
        TaskList result = taskListService.saveTaskList(input);

        // Assert
        assertEquals(saved.getListID(), result.getListID());
        assertEquals(saved.getName(), result.getName());

        verify(taskListRepository, times(1)).save(input);
    }

    @Test
    void testGetTaskListsByProjectID() {
        // Arrange
        int projectId = 101;

        TaskList mockList = new TaskList();
        mockList.setListID(1);
        mockList.setProjectID(projectId);
        mockList.setName("Mock List");

        List<TaskList> mockListData = List.of(mockList);
        when(taskListRepository.findByProjectID(projectId)).thenReturn(mockListData);

        // Act
        HashMap<Integer, TaskList> result = taskListService.getTaskListsByProjectID(projectId);

        // Assert
        assertEquals(1, result.size());
        assertTrue(result.containsKey(1));
        assertEquals("Mock List", result.get(1).getName());

        verify(taskListRepository, times(1)).findByProjectID(projectId);
    }

    @Test
    void testDeleteTaskList_whenExists() {
        // Arrange
        int listId = 1;
        when(taskListRepository.existsById(listId)).thenReturn(true);

        // Act
        boolean result = taskListService.deleteTaskList(listId);

        // Assert
        assertTrue(result);
        verify(taskListRepository, times(1)).existsById(listId);
        verify(taskListRepository, times(1)).deleteById(listId);
    }

    @Test
    void testDeleteTaskList_whenDoesNotExist() {
        // Arrange
        int listId = 2;
        when(taskListRepository.existsById(listId)).thenReturn(false);

        // Act
        boolean result = taskListService.deleteTaskList(listId);

        // Assert
        assertFalse(result);
        verify(taskListRepository, times(1)).existsById(listId);
        verify(taskListRepository, never()).deleteById(anyInt());
    }

    @Test
    void testDeleteTaskListsByProjectID_whenListsExist() {
        // Arrange
        int projectId = 123;
        TaskList list1 = new TaskList();
        list1.setListID(1);
        list1.setProjectID(projectId);

        TaskList list2 = new TaskList();
        list2.setListID(2);
        list2.setProjectID(projectId);

        List<TaskList> taskLists = List.of(list1, list2);

        when(taskListRepository.findByProjectID(projectId)).thenReturn(taskLists);

        // Act
        boolean result = taskListService.deleteTaskListsByProjectID(projectId);

        // Assert
        assertTrue(result);
        verify(taskListRepository, times(1)).findByProjectID(projectId);
        verify(taskListRepository, times(1)).deleteAll(taskLists);
    }

    @Test
    void testDeleteTaskListsByProjectID_whenNoListsExist() {
        // Arrange
        int projectId = 999;
        when(taskListRepository.findByProjectID(projectId)).thenReturn(Collections.emptyList());

        // Act
        boolean result = taskListService.deleteTaskListsByProjectID(projectId);

        // Assert
        assertFalse(result);
        verify(taskListRepository, times(1)).findByProjectID(projectId);
        verify(taskListRepository, never()).deleteAll(any());
    }
}
