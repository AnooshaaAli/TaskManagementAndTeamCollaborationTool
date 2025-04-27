package com.example.demo.Repositories;

import com.example.demo.Models.MemberHasTask;
import com.example.demo.Models.MemberHasTaskId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberHasTaskRepository extends JpaRepository<MemberHasTask, MemberHasTaskId> {
    boolean existsByTask_TaskIDAndMember_UserID(int taskID, int memberID);
     boolean existsByTask_TaskID(int taskID);
     
    List<MemberHasTask> findByMember_UserID(int memberID);
}
