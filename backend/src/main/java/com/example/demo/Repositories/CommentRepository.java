package com.example.demo.Repositories;

import com.example.demo.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByProjectID(int projectID); // fetch all comments for a specific project

    List<Comment> findByUserID(int userID);
}
