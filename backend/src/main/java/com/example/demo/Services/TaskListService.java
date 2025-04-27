package com.example.demo.Services;

import com.example.demo.Models.TaskList;
import com.example.demo.Repositories.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {
    @Autowired
    private TaskListRepository taskListRepository;

    public TaskList saveTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public Optional<TaskList> getTaskListById(int id) {
        return taskListRepository.findById(id);
    }


    public HashMap<Integer, TaskList> getTaskListsByProjectID(int projectID) {
        List<TaskList> taskLists = taskListRepository.findByProjectID(projectID);
        HashMap<Integer, TaskList> taskListMap = new HashMap<>();
        for (TaskList taskList : taskLists) {
            taskListMap.put(taskList.getListID(), taskList);
        }
        return taskListMap;
    }


    public boolean deleteTaskList(int id) {
        if (taskListRepository.existsById(id)) {
            taskListRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean deleteTaskListsByProjectID(int projectID) {
        List<TaskList> taskLists = taskListRepository.findByProjectID(projectID);
        if (taskLists.isEmpty()) {
            return false;
        }

        taskListRepository.deleteAll(taskLists);
        return true;
    }


}
