package com.example.demo.Models;

import jakarta.persistence.*; // or javax.persistence.* depending on your version

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentID;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String value;

    @Column(name = "projectID")
    private int projectID;

    @Column(name = "userID")
    private int userID;

    public Comment() {
    }

    public Comment(String value, int projectID, int userID) {
        this.value = value;
        this.projectID = projectID;
        this.userID = userID;
    }

    public int getCommentID() {
        return commentID;
    }

    public void setCommentID(int commentID) {
        this.commentID = commentID;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getProjectID() {
        return projectID;
    }

    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

}