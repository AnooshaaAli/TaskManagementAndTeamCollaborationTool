package com.example.demo.Services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.Models.Comment;
import com.example.demo.Repositories.CommentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateComment() {
        // Arrange
        Comment input = new Comment();
        input.setValue("This is a test comment.");

        Comment saved = new Comment();
        saved.setCommentID(1);
        saved.setValue("This is a test comment.");

        when(commentRepository.save(input)).thenReturn(saved);

        // Act
        Comment result = commentService.createComment(input);

        // Assert
        assertEquals(saved.getCommentID(), result.getCommentID());
        assertEquals(saved.getValue(), result.getValue());

        verify(commentRepository, times(1)).save(input);
    }

    @Test
    void testDeleteComment() {
        // Arrange
        int commentId = 5;

        // Act
        commentService.deleteComment(commentId);

        // Assert
        verify(commentRepository, times(1)).deleteById(commentId);
    }

    @Test
    void testGetCommentsByProjectId() {
        // Arrange
        int projectId = 42;

        Comment comment1 = new Comment();
        comment1.setCommentID(1);
        comment1.setValue("Comment 1");
        comment1.setProjectID(projectId);

        Comment comment2 = new Comment();
        comment2.setCommentID(2);
        comment2.setValue("Comment 2");
        comment2.setProjectID(projectId);

        List<Comment> mockComments = List.of(comment1, comment2);

        when(commentRepository.findByProjectID(projectId)).thenReturn(mockComments);

        // Act
        List<Comment> result = commentService.getCommentsByProjectId(projectId);

        // Assert
        assertEquals(2, result.size());
        assertEquals("Comment 1", result.get(0).getValue());
        assertEquals("Comment 2", result.get(1).getValue());

        verify(commentRepository, times(1)).findByProjectID(projectId);
    }
}
