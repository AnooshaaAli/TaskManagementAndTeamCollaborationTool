package com.example.demo.Models;

import jakarta.persistence.*;

import java.util.HashMap;

@Entity
@Table(name = "List")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listID;
    private String name;
    private int projectID;
    private HashMap<Integer, Task> tasks;

    public TaskList() {
    }

    public TaskList(int listID, String name, int projectID) {
        this.listID = listID;
        this.name = name;
        this.projectID = projectID;
        this.tasks = new HashMap<Integer, Task>();
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

    public HashMap<Integer, Task> getTasks() {
        return tasks;
    }

    public void setTasks(HashMap<Integer, Task> tasks) {
        this.tasks = tasks;
    }
}