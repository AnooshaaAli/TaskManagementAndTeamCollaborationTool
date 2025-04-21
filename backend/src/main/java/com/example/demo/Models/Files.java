package com.example.demo.Models;

import jakarta.persistence.*; // or javax.persistence.* depending on your version

@Entity
@Table(name = "File")
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileID;

    @Column(nullable = false)
    private String fileName;

    @Column
    private String mimeType;

    @Column(columnDefinition = "TEXT")
    private String filePath;

    @Column
    private Integer projectID;

    // Constructors
    public Files() {}

    public Files(String fileName, String mimeType, String filePath, Integer projectID) {
        this.fileName = fileName;
        this.mimeType = mimeType;
        this.filePath = filePath;
        this.projectID = projectID;
    }

    // Getters and Setters

    public Integer getFileID() {
        return fileID;
    }

    public void setFileID(Integer fileID) {
        this.fileID = fileID;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Integer getProjectID() {
        return projectID;
    }

    public void setProjectID(Integer projectID) {
        this.projectID = projectID;
    }
}