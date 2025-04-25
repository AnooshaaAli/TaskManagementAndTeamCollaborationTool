package com.example.demo.Controllers;

import com.example.demo.Models.Files;
import com.example.demo.Services.FileService;
import com.example.demo.dto.FileInfoDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FileControllerTest {

    @InjectMocks
    private FileController fileController;

    @Mock
    private FileService fileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUploadFile_success() throws IOException {
        // Arrange
        String fileName = "testfile.txt";
        String mimeType = "text/plain";
        byte[] content = "Sample Content".getBytes();

        MultipartFile mockMultipartFile = new MockMultipartFile("file", fileName, mimeType, content);
        Files inputFile = new Files();
        inputFile.setFileName(fileName);
        inputFile.setMimeType(mimeType);
        inputFile.setProjectID(1);

        Files savedFile = new Files(fileName, mimeType, "files/" + fileName, 1);
        savedFile.setFileID(1);

        when(fileService.createFile(any(Files.class))).thenReturn(savedFile);

        // Act
        ResponseEntity<?> response = fileController.uploadFile(mockMultipartFile, 1);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Files returnedFile = (Files) response.getBody();
        assertNotNull(returnedFile);
        assertEquals(savedFile.getFileName(), returnedFile.getFileName());
        assertEquals(savedFile.getFileID(), returnedFile.getFileID());

        verify(fileService, times(1)).createFile(any(Files.class));
    }

    @Test
    void testGetFileNamesByProjectId_success() {
        // Arrange
        Integer projectId = 101;
        HashMap<Integer, FileInfoDTO> mockMap = new HashMap<>();
        mockMap.put(1, new FileInfoDTO(1, "doc1.pdf"));
        mockMap.put(2, new FileInfoDTO(2, "image.png"));

        when(fileService.getFileInfoByProjectId(projectId)).thenReturn(mockMap);

        // Act
        ResponseEntity<HashMap<Integer, FileInfoDTO>> response = fileController.getFileNamesByProjectId(projectId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals("doc1.pdf", response.getBody().get(1).getFileName());

        verify(fileService, times(1)).getFileInfoByProjectId(projectId);
    }

    @Test
    void testGetFileNamesByProjectId_noContent() {
        // Arrange
        Integer projectId = 404;
        when(fileService.getFileInfoByProjectId(projectId)).thenReturn(new HashMap<>());

        // Act
        ResponseEntity<HashMap<Integer, FileInfoDTO>> response = fileController.getFileNamesByProjectId(projectId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());

        verify(fileService, times(1)).getFileInfoByProjectId(projectId);
    }

    @Test
    void testGetFile_fileExists() throws IOException {
        // Arrange
        String fileName = "existing.txt";
        File file = new File("files" + File.separator + fileName);
        file.getParentFile().mkdirs();
        java.nio.file.Files.write(file.toPath(), "dummy content".getBytes());

        // Act
        ResponseEntity<?> response = fileController.getFile(fileName);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getHeaders().get("Content-Type").get(0).startsWith("text"));
        assertNotNull(response.getBody());

        // Clean up
        file.delete();
    }

    @Test
    void testGetFile_fileNotFound() {
        // Arrange
        String fileName = "nonexistent.txt";

        // Act
        ResponseEntity<?> response = fileController.getFile(fileName);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
