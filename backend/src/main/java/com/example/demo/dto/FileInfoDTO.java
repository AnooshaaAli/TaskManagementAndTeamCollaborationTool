package com.example.demo.dto;

public class FileInfoDTO {
    private Integer fileID;
    private String fileName;

    public FileInfoDTO() {

    }

    public FileInfoDTO(Integer fileID, String fileName) {
        this.fileID = fileID;
        this.fileName = fileName;
    }

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
}
