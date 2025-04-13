package com.example.demo.Controllers;

import com.example.demo.Models.Comment;
import com.example.demo.Services.CommentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Get all comments or filter by projectId or userId
    @GetMapping("/{projectID}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable int projectID) {

        List<Comment> comments= commentService.getCommentsByProjectId(projectID);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // Post a new comment
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.createComment(comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
}