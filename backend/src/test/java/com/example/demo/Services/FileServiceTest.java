package com.example.demo.Services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.Models.Files;
import com.example.demo.Repositories.FileRepository;
import com.example.demo.dto.FileInfoDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

public class FileServiceTest {

    @Mock
    private FileRepository fileRepository;

    @InjectMocks
    private FileService fileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateFile() {
        // Arrange
        Files input = new Files("test.txt", "text/plain", "/files/test.txt", 1);
        Files saved = new Files("test.txt", "text/plain", "/files/test.txt", 1);
        saved.setFileID(1);

        when(fileRepository.save(input)).thenReturn(saved);

        // Act
        Files result = fileService.createFile(input);

        // Assert
        assertEquals(saved.getFileID(), result.getFileID());
        assertEquals(saved.getFileName(), result.getFileName());
        verify(fileRepository, times(1)).save(input);
    }

    @Test
    void testGetFileById_Found() {
        // Arrange
        Files file = new Files("document.pdf", "application/pdf", "/files/document.pdf", 2);
        file.setFileID(5);

        when(fileRepository.findById(5)).thenReturn(Optional.of(file));

        // Act
        Files result = fileService.getFileById(5);

        // Assert
        assertNotNull(result);
        assertEquals(5, result.getFileID());
        assertEquals("document.pdf", result.getFileName());
        verify(fileRepository, times(1)).findById(5);
    }

    @Test
    void testGetFileById_NotFound() {
        // Arrange
        when(fileRepository.findById(999)).thenReturn(Optional.empty());

        // Act
        Files result = fileService.getFileById(999);

        // Assert
        assertNull(result);
        verify(fileRepository, times(1)).findById(999);
    }

    @Test
    void testGetFilesByProjectID() {
        // Arrange
        int projectId = 10;

        Files file1 = new Files("a.txt", "text/plain", "/files/a.txt", projectId);
        file1.setFileID(1);

        Files file2 = new Files("b.txt", "text/plain", "/files/b.txt", projectId);
        file2.setFileID(2);

        List<Files> fileList = List.of(file1, file2);
        when(fileRepository.findByProjectID(projectId)).thenReturn(fileList);

        // Act
        HashMap<Integer, Files> result = fileService.getFilesByProjectID(projectId);

        // Assert
        assertEquals(2, result.size());
        assertTrue(result.containsKey(1));
        assertEquals("a.txt", result.get(1).getFileName());
        assertEquals("b.txt", result.get(2).getFileName());

        verify(fileRepository, times(1)).findByProjectID(projectId);
    }

    @Test
    void testGetFileInfoByProjectId() {
        // Arrange
        int projectId = 20;

        Files file1 = new Files("alpha.java", "text/java", "/files/alpha.java", projectId);
        file1.setFileID(100);

        Files file2 = new Files("beta.java", "text/java", "/files/beta.java", projectId);
        file2.setFileID(101);

        List<Files> fileList = List.of(file1, file2);
        when(fileRepository.findByProjectID(projectId)).thenReturn(fileList);

        // Act
        HashMap<Integer, FileInfoDTO> result = fileService.getFileInfoByProjectId(projectId);

        // Assert
        assertEquals(2, result.size());
        assertEquals("alpha.java", result.get(100).getFileName());
        assertEquals("beta.java", result.get(101).getFileName());

        verify(fileRepository, times(1)).findByProjectID(projectId);
    }
}
