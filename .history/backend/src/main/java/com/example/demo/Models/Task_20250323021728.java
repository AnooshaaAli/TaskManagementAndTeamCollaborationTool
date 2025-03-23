package com.example.demo.Models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskID;

    @Column(nullable = false)
    private String title;

    @Temporal(TemporalType.DATE)
    private Date deadline;

    @Column(nullable = false)
    private String status;

    @Column(name = "listID", insertable = false, updatable = false)
private int listID;

    private int listID;

    @ManyToOne
    @JoinColumn(name = "listID", nullable = false)
    private TaskList taskList;

    // Constructors
    public Task() {
    }

    public Task(String title, Date deadline, String status, int listID) {
        this.title = title;
        this.deadline = deadline;
        this.status = status;
        this.listID = listID;
        this.taskList = null;
    }

    // Getters and Setters
    public int getTaskID() {
        return taskID;
    }

    public void setTaskID(int taskID) {
        this.taskID = taskID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getListID() {
        return listID;
    }

    public void setListID(int listID) {
        this.listID = listID;
    }

    public TaskList getTaskList() {
        return taskList;
    }
    
    public void setTaskList(TaskList taskList) {
        this.taskList = taskList;
    }   
}
