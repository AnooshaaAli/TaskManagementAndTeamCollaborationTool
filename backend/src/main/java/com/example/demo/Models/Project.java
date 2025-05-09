package com.example.demo.Models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "Project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectID;
    private String name;
    private String description;

    @Column(name = "teamLeadID")
    private int teamLeadID;

    @OneToMany(mappedBy = "projectID", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TaskList> taskLists = new ArrayList<>(); // Use List for DB mapping

    @Transient
    private HashMap<Integer, TaskList> lists = new HashMap<>();
    @Transient
    private HashMap<Integer, Files> files;
    @Transient
    private HashMap<Integer, Comment> comments;

    public Project() {
        this.taskLists = new ArrayList<>();
    }

    public Project(int projectID, String name, int teamLeadID, String description) {
        this.projectID = projectID;
        this.name = name;
        this.teamLeadID = teamLeadID;
        this.taskLists = new ArrayList<>();
        this.description = description;
        this.files = new HashMap<>();
        this.comments = new HashMap<>();
    }

    public int getProjectID() {
        return projectID;
    }

    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }

    public int getTeamLeadID() {
        return teamLeadID;
    }

    public void setTeamLeadID(int teamLeadID) {
        this.teamLeadID = teamLeadID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public HashMap<Integer, TaskList> getLists() {
        if (lists.isEmpty() && taskLists != null) {
            for (TaskList list : taskLists) {
                lists.put(list.getListID(), list);
            }
        }
        return lists;
    }

    public void setLists(HashMap<Integer, TaskList> lists) {
        this.lists = lists;
        this.taskLists = new ArrayList<>(lists.values());
    }

    public List<TaskList> getTaskLists() {
        return taskLists;
    }

    public void setTaskLists(List<TaskList> taskLists) {
        this.taskLists = taskLists;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HashMap<Integer, Files> getFiles() {
        return files;
    }

    public void setFiles(HashMap<Integer, Files> files) {
        this.files = files;
    }

    public HashMap<Integer, Comment> getComments() {
        return comments;
    }

    public void setComments(HashMap<Integer, Comment> comments) {
        this.comments = comments;
    }
}