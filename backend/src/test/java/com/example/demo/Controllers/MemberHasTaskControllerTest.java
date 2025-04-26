package com.example.demo.Controllers;

import com.example.demo.Models.Account;
import com.example.demo.Models.Task;
import com.example.demo.Models.User;
import com.example.demo.Models.TaskList;
import com.example.demo.Services.*;
import com.example.demo.Repositories.TaskListRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.Map;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MemberHasTaskControllerTest {

    @Mock
    private TaskService taskService;

    @Mock
    private TaskListRepository taskListRepository;

    @Mock
    private TeamService teamService;

    @Mock
    private MemberHasTaskService memberHasTaskService;

    @Mock
    private UserService userService;

    @InjectMocks
    private MemberHasTaskController controller;

    private Task dummyTask;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        dummyTask = new Task();
        dummyTask.setTaskID(1);
        dummyTask.setListID(10);
    }

    @Test
    public void testAssignTask_success() {
        TaskList list = new TaskList();
        list.setProjectID(100);

        when(taskService.getTaskById(1)).thenReturn(dummyTask);
        when(taskListRepository.findById(10)).thenReturn(Optional.of(list));
        when(teamService.isUserInTeamForProject(5, 100)).thenReturn(true);
        when(memberHasTaskService.assignTaskToMember(1, 5)).thenReturn(true);

        String response = controller.assignTask(1, 5);

        assertEquals("Task assigned successfully.", response);
    }

    @Test
    public void testAssignTask_userNotInTeam() {
        TaskList list = new TaskList();
        list.setProjectID(100);

        when(taskService.getTaskById(1)).thenReturn(dummyTask);
        when(taskListRepository.findById(10)).thenReturn(Optional.of(list));
        when(teamService.isUserInTeamForProject(5, 100)).thenReturn(false);

        String response = controller.assignTask(1, 5);

        assertEquals("User is not a member of the correct team for this project.", response);
    }

    @Test
    public void testAssignTask_taskNotFound() {
        when(taskService.getTaskById(1)).thenReturn(null);

        String response = controller.assignTask(1, 5);

        assertEquals("Task not found.", response);
    }

    @Test
    public void testAssignTask_projectNotFound() {
        when(taskService.getTaskById(1)).thenReturn(dummyTask);
        when(taskListRepository.findById(10)).thenReturn(Optional.empty());

        String response = controller.assignTask(1, 5);

        assertEquals("Project not found for the task.", response);
    }

    @Test
    public void testGetUserByUsername_success() {
        Account account = new Account();
        account.setUsername("john123");

        User user = new User();
        user.setUserID(42);
        user.setAccount(account);

        when(userService.findUserByAccountUsername("john123")).thenReturn(user);

        ResponseEntity<?> response = controller.getUserByUsername("john123");

        assertEquals(200, response.getStatusCodeValue());

        // Ensure you cast the body to Map correctly
        Map<String, Object> result = (Map<String, Object>) response.getBody();
        assertEquals(42, result.get("userID"));
        assertEquals("john123", result.get("username"));
    }

    @Test
    public void testGetUserByUsername_notFound() {
        when(userService.findUserByAccountUsername("unknown")).thenReturn(null);

        ResponseEntity<?> response = controller.getUserByUsername("unknown");

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("User not found", response.getBody());
    }

}
