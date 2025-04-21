package com.example.demo.Controllers;

import com.example.demo.Models.Files;
import com.example.demo.Services.FileService;
import com.example.demo.dto.FileInfoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;

@RestController
@RequestMapping("/files")
public class FileController {
    private final String uploadDir = Paths.get("").toAbsolutePath() + File.separator + "files";

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectID") Integer projectID) {

        try {
            // 1. Clean filename
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

            // 2. Create upload directory if it doesn't exist
            File dir = new File(uploadDir);
            if (!dir.exists())
                dir.mkdirs();

            // 3. Full path for file
            String filePath = uploadDir + File.separator + originalFilename;

            // 4. Save file to local file system
            file.transferTo(new File(filePath));

            // 5. Save file metadata to DB
            Files newFile = new Files();
            newFile.setFileName(originalFilename);
            newFile.setMimeType(file.getContentType());
            newFile.setFilePath(filePath);
            newFile.setProjectID(projectID);

            Files saved = fileService.createFile(newFile);

            return ResponseEntity.ok(saved);

        } catch (DataIntegrityViolationException e) {
            // Duplicate filename likely caused by unique constraint violation
            return ResponseEntity.badRequest()
                    .body("A file with this name already exists. Please rename the file and try again.");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<?> getFile(@PathVariable String fileName) {
        File file = new File("files" + File.separator + fileName);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        try {
            byte[] fileContent = java.nio.file.Files.readAllBytes(file.toPath());
            String mimeType = java.nio.file.Files.probeContentType(file.toPath());
            return ResponseEntity
                    .ok()
                    .header("Content-Type", mimeType)
                    .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error reading file: " + e.getMessage());
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<HashMap<Integer, FileInfoDTO>> getFileNamesByProjectId(@PathVariable Integer projectId) {
        HashMap<Integer, FileInfoDTO> fileMap = fileService.getFileInfoByProjectId(projectId);

        if (fileMap.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(fileMap);
    }

}
