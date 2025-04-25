package com.example.demo.Controllers;

import com.example.demo.Models.Comment;
import com.example.demo.Services.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CommentControllerTest {

    @InjectMocks
    private CommentController commentController;

    @Mock
    private CommentService commentService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCommentsByProjectId_success() {
        // Arrange
        int projectId = 1;
        Comment comment1 = new Comment();
        comment1.setCommentID(101);
        comment1.setProjectID(projectId);
        comment1.setUserID(201);
        comment1.setValue("Nice work!");

        Comment comment2 = new Comment();
        comment2.setCommentID(102);
        comment2.setProjectID(projectId);
        comment2.setUserID(202);
        comment2.setValue("Looks good!");

        List<Comment> mockComments = Arrays.asList(comment1, comment2);

        when(commentService.getCommentsByProjectId(projectId)).thenReturn(mockComments);

        // Act
        ResponseEntity<List<Comment>> response = commentController.getComments(projectId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("Nice work!", response.getBody().get(0).getValue());

        verify(commentService, times(1)).getCommentsByProjectId(projectId);
    }

    @Test
    void testCreateComment_success() {
        // Arrange
        Comment input = new Comment();
        input.setProjectID(1);
        input.setUserID(201);
        input.setValue("Great job!");

        Comment saved = new Comment();
        saved.setCommentID(123);
        saved.setProjectID(1);
        saved.setUserID(201);
        saved.setValue("Great job!");

        when(commentService.createComment(input)).thenReturn(saved);

        // Act
        ResponseEntity<Comment> response = commentController.createComment(input);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(123, response.getBody().getCommentID());
        assertEquals("Great job!", response.getBody().getValue());

        verify(commentService, times(1)).createComment(input);
    }
}
