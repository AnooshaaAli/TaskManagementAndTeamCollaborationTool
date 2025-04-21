package com.example.demo.Services;

import com.example.demo.Models.Files;
import com.example.demo.Repositories.FileRepository;
import com.example.demo.dto.FileInfoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    // Get all files by projectID as a map
    public HashMap<Integer, Files> getFilesByProjectID(int projectID) {
        List<Files> fileList = fileRepository.findByProjectID(projectID);

        HashMap<Integer, Files> fileMap = new HashMap<>();
        for (Files file : fileList) {
            fileMap.put(file.getFileID(), file);
        }

        return fileMap;
    }

    // Create a new file entry
    public Files createFile(Files file) {
        return fileRepository.save(file);
    }

    // Get all files
    public List<Files> getAllFiles() {
        return fileRepository.findAll();
    }

    // Get a file by ID
    public Files getFileById(int fileID) {
        Optional<Files> file = fileRepository.findById(fileID);
        return file.orElse(null);
    }

    // Update a file entry
    public Files updateFile(int fileID, Files updatedFile) {
        Optional<Files> optionalFile = fileRepository.findById(fileID);
        if (!optionalFile.isPresent()) {
            return null;
        }

        Files existingFile = optionalFile.get();

        existingFile.setFileName(updatedFile.getFileName());
        existingFile.setMimeType(updatedFile.getMimeType());
        existingFile.setFilePath(updatedFile.getFilePath());

        // You can update projectID too if needed:
        // existingFile.setProjectID(updatedFile.getProjectID());

        return fileRepository.save(existingFile);
    }

    // Delete a file by ID
    public boolean deleteFile(int fileID) {
        if (fileRepository.existsById(fileID)) {
            fileRepository.deleteById(fileID);
            return true;
        }
        return false;
    }

    public HashMap<Integer, Files> getFilesByProjectId(Integer projectId) {
        List<Files> fileList = fileRepository.findByProjectID(projectId);
        HashMap<Integer, Files> fileMap = new HashMap<>();

        for (Files file : fileList) {
            fileMap.put(file.getFileID(), file);
        }

        return fileMap;
    }

    public HashMap<Integer, FileInfoDTO> getFileInfoByProjectId(Integer projectId) {
        List<Files> fileList = fileRepository.findByProjectID(projectId);
        HashMap<Integer, FileInfoDTO> fileMap = new HashMap<>();

        for (Files file : fileList) {
            FileInfoDTO dto = new FileInfoDTO(file.getFileID(), file.getFileName());
            fileMap.put(file.getFileID(), dto);
        }

        return fileMap;
    }
}
