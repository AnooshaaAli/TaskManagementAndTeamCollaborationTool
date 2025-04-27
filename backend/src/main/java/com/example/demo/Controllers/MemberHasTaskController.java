package com.example.demo.Controllers;

import com.example.demo.Services.MemberHasTaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.TaskService;
import com.example.demo.Repositories.TaskListRepository;
import com.example.demo.Services.TeamService;
import com.example.demo.Models.Task;
import com.example.demo.Models.User;
import com.example.demo.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/assign")
public class MemberHasTaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private TeamService teamService;

    @Autowired
    private MemberHasTaskService memberHasTaskService;

    @Autowired
    private UserService userService;

    @GetMapping("/getUserIdByUsername")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        User user = userService.findUserByAccountUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Return only the userID (and optionally the username)
        Map<String, Object> response = new HashMap<>();
        response.put("userID", user.getUserID());
        response.put("username", user.getAccount().getUsername()); // Optional

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public String assignTask(@RequestParam int taskID, @RequestParam int memberID) {
        Task task = taskService.getTaskById(taskID);
        if (task == null) {
            return "Task not found.";
        }

        // Get projectID using task's listID
        int listID = task.getListID();
        Integer projectID = taskListRepository.findById(listID)
                .map(taskList -> taskList.getProjectID())
                .orElse(null);

        if (projectID == null) {
            return "Project not found for the task.";
        }

        boolean isMemberOfTeam = teamService.isUserInTeamForProject(memberID, projectID);
        if (!isMemberOfTeam) {
            return "User is not a member of the correct team for this project.";
        }

        boolean success = memberHasTaskService.assignTaskToMember(taskID, memberID);
        return success ? "Task assigned successfully." : "Task already assigned or invalid IDs.";
    }

    @GetMapping("/assignedTasks")
    public ResponseEntity<?> getTasksByMemberID(@RequestParam int memberID) {
        System.out.println("--------------------------entered assignedtasks");
        List<Integer> taskIDs = memberHasTaskService.getTaskIdsByMemberId(memberID);

        if (taskIDs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tasks found for this member.");
        }

        HashMap<Integer, Task> tasksMap = new HashMap<>();

        for (Integer taskID : taskIDs) {
            Task task = taskService.getTaskById(taskID);
            if (task != null) {
                tasksMap.put(taskID, task);
            }
        }

        return ResponseEntity.ok(tasksMap);
    }

}
