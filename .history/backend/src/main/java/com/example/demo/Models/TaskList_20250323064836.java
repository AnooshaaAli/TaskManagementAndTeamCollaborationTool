package com.example.demo.Models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name = "List")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listID;
    private String name;
    private int projectID;

    @OneToMany(mappedBy = "taskList", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasksList = new ArrayList<>();
    

    @Transient
    private HashMap<Integer, Task> tasks = new HashMap<>(); /

    public TaskList() {
    }

    public TaskList(int listID, String name, int projectID) {
        this.listID = listID;
        this.name = name;
        this.projectID = projectID;
        this.tasks = new HashMap<Integer, Task>();
        this.tasksList = new ArrayList<>();
    }

    public TaskList(int listID, String name, int projectID, HashMap<Integer, Task> tasks) {
        this.listID = listID;
        this.name = name;
        this.projectID = projectID;
        this.tasks = tasks;
    }

    public int getListID() {
        return listID;
    }

    public void setListID(int listID) {
        this.listID = listID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProjectID() {
        return projectID;
    }

    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }

   // Syncing HashMap with List
   public HashMap<Integer, Task> getTasks() {
        if (tasks.isEmpty() && tasksList != null) {
            for (Task task : tasksList) {
                tasks.put(task.getTaskID(), task);
            }
        }
        return tasks;
    }

    public void setTasks(HashMap<Integer, Task> tasks) {
        this.tasks = tasks;
        this.tasksList = new ArrayList<>(tasks.values()); // Convert HashMap to List
    }

    public List<Task> getTasksList() {
        return tasksList;
    }

    public void setTasksList(List<Task> tasksList) {
        this.tasksList = tasksList;
    } 
}