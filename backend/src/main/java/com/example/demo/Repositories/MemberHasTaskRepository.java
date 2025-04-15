package com.example.demo.Repositories;

import com.example.demo.Models.MemberHasTask;
import com.example.demo.Models.MemberHasTaskId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberHasTaskRepository extends JpaRepository<MemberHasTask, MemberHasTaskId> {
    boolean existsByTask_TaskIDAndMember_UserID(int taskID, int memberID);

}
