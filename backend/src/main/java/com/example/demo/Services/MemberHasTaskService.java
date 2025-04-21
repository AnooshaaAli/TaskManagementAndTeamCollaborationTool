package com.example.demo.Services;

import com.example.demo.Models.*;
import com.example.demo.Repositories.MemberHasTaskRepository;
import com.example.demo.Repositories.TaskRepository;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.TaskListRepository;
import com.example.demo.Repositories.ProjectRepository;
import com.example.demo.Repositories.NotificationRepository;

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

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private ProjectRepository projectRepository;


    public boolean assignTaskToMember(int taskID, int memberID) {
        if (memberHasTaskRepository.existsByTask_TaskID(taskID)) {
            return false; // Task is already assigned to someone
        }


        User member = userRepository.findById(memberID).orElse(null);
        Task task = taskRepository.findById(taskID).orElse(null);

        if (member == null || task == null) return false;

        MemberHasTask assignment = new MemberHasTask(member, task);
        memberHasTaskRepository.save(assignment);

        // Send Notification
        int listID = task.getListID();
        Integer projectID = taskListRepository.findById(listID)
                                .map(list -> list.getProjectID())
                                .orElse(null);

        if (projectID != null) {
            Project project = projectRepository.findById(projectID).orElse(null);
            String content = "You have been assigned a new task: \"" + task.getTitle() + "\" in project \"" + project.getName() + "\".";
            Notification notification = new Notification(content, project, member);
            notificationRepository.save(notification);
        }

        return true;
    }
    
}
