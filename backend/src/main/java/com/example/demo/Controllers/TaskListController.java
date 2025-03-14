package com.example.demo.Controllers;

import com.example.demo.Models.TaskList;
import com.example.demo.Services.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/lists")
public class TaskListController {
    @Autowired
    private TaskListService taskListService;

    @PostMapping
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList) {
        TaskList savedTaskList = taskListService.saveTaskList(taskList);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable int id) {
        return taskListService.getTaskListById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllTaskLists() {
        return ResponseEntity.ok(taskListService.getAllTaskLists());
    }

    @GetMapping("/project/{projectID}")
    public ResponseEntity<HashMap<Integer, TaskList>> getTaskListsByProject(@PathVariable int projectID) {
        HashMap<Integer, TaskList> taskLists = taskListService.getTaskListsByProjectID(projectID);
        if (taskLists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(taskLists);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable int id, @RequestBody TaskList updatedTaskList) {
        return taskListService.updateTaskList(id, updatedTaskList)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable int id) {
        if (taskListService.deleteTaskList(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/project/{projectID}")
    public ResponseEntity<Void> deleteTaskListsByProject(@PathVariable int projectID) {
        boolean deleted = taskListService.deleteTaskListsByProjectID(projectID);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
