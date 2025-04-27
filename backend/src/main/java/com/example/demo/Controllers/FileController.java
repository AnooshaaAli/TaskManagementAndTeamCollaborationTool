package com.example.demo.Controllers;

import com.example.demo.Models.Account;
import com.example.demo.Models.Files;
import com.example.demo.Services.AccountService;
import com.example.demo.Services.FileService;
import com.example.demo.dto.FileInfoDTO;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private AccountService accountService;

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

    @PostMapping("/uploadDp")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("accountID") Integer accountID) {

        try {
            // 1. Clean filename and append account ID (or timestamp) to make it unique
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String newFileName = accountID + "_" + originalFilename; // Use account ID or combination with timestamp

            // 2. Create dps directory if it doesn't exist
            File dir = new File(uploadDir + File.separator + "dps");
            if (!dir.exists())
                dir.mkdirs();

            // 3. Full path for file in dps folder
            String filePath = dir.getPath() + File.separator + newFileName;

            // 4. Save the file to local file system
            file.transferTo(new File(filePath));

            // 5. Save file metadata to DB
            Files newFile = new Files();
            newFile.setFileName(newFileName);
            newFile.setMimeType(file.getContentType());
            newFile.setFilePath(filePath);
            newFile.setProjectID(null); // No need to associate with a project, as it's a DP

            Files savedFile = fileService.createFile(newFile);

            // 6. Update Account to link the profile picture
            Optional<Account> accountOpt = accountService.getAccountById(accountID);
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                account.setProfilePicFileID(savedFile.getFileID());
                accountService.updateAccount(account); // Save the account with the updated profile picture ID
            } else {
                return ResponseEntity.notFound().build(); // Account not found
            }

            return ResponseEntity.ok(savedFile);

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body("A file with this name already exists. Please rename the file and try again.");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/user-dp/{accountID}")
    public ResponseEntity<?> getUserProfilePicture(@PathVariable("accountID") Integer accountID) {
        try {
            // Retrieve account by ID
            Account account = accountService.getAccountById(accountID)
                    .orElseThrow(() -> new RuntimeException("Account not found"));

            // Check if the account has a profile picture
            Integer fileID = account.getProfilePicFileID();
            if (fileID == 0) {
                return ResponseEntity.badRequest().body("Profile picture not set.");
            }

            // Retrieve the file metadata using the file ID (updated to return null)
            Files file = fileService.getFileById(fileID);
            if (file == null) { // Check if the file is null
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found");
            }

            // Construct the full path to the file
            File fileOnDisk = new File(file.getFilePath());
            if (!fileOnDisk.exists()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File not found on server.");
            }

            // Use java.nio to read file content and determine mime type
            byte[] fileContent = java.nio.file.Files.readAllBytes(fileOnDisk.toPath());
            String mimeType = java.nio.file.Files.probeContentType(fileOnDisk.toPath());

            // Return the file content with the appropriate content type
            return ResponseEntity.ok()
                    .header("Content-Type", mimeType)
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving profile picture: " + e.getMessage());
        }
    }

}
