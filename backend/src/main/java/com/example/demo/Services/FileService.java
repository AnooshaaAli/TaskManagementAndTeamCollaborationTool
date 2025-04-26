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

    // Get a file by ID
    public Files getFileById(int fileID) {
        Optional<Files> file = fileRepository.findById(fileID);
        return file.orElse(null);
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
