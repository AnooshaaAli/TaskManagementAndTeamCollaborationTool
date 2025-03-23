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
    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false)
    private Project project;

    private HashMap<Integer, Task> tasks;

    public TaskList() {
    }

    public TaskList(String name, Project project) {
        this.name = name;
        this.project = project;
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