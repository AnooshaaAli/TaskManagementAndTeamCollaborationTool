package com.example.demo.Services;

import com.example.demo.Models.*;
import com.example.demo.Repositories.MemberHasTaskRepository;
import com.example.demo.Repositories.TaskRepository;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberHasTaskService {

    @Autowired
    private MemberHasTaskRepository memberHasTaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamHasMemberRepository;

    public boolean assignTaskToMember(int taskID, int memberID) {
        if (memberHasTaskRepository.existsByTask_TaskIDAndMember_UserID(taskID, memberID)) {
            return false; // Already assigned
        }

        User member = userRepository.findById(memberID).orElse(null);
        Task task = taskRepository.findById(taskID).orElse(null);

        if (member == null || task == null) return false;

        MemberHasTask assignment = new MemberHasTask(member, task);
        memberHasTaskRepository.save(assignment);
        return true;
    }
    
}
