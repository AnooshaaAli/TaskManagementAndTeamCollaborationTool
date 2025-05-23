package com.example.demo.Services;

import com.example.demo.Models.*;
import com.example.demo.Repositories.MemberHasTaskRepository;
import com.example.demo.Repositories.TaskRepository;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Repositories.TeamRepository;
import com.example.demo.Services.EmailService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.TaskListRepository;
import com.example.demo.Repositories.ProjectRepository;
import com.example.demo.Repositories.NotificationRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


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

    @Autowired
    private EmailService emailService;

    public boolean assignTaskToMember(int taskID, int memberID) {
        if (memberHasTaskRepository.existsByTask_TaskID(taskID)) {
            return false; // Task is already assigned to someone
        }

        User member = userRepository.findById(memberID).orElse(null);
        Task task = taskRepository.findById(taskID).orElse(null);

        if (member == null || task == null)
            return false;

        MemberHasTask assignment = new MemberHasTask(member, task);
        memberHasTaskRepository.save(assignment);

        // Send Notification
        int listID = task.getListID();
        Integer projectID = taskListRepository.findById(listID)
                .map(list -> list.getProjectID())
                .orElse(null);
        Project project = projectRepository.findById(projectID).orElse(null);

        if (project != null && member != null) {
            // Construct email content
            String content = "You have been assigned a new task: \"" + task.getTitle() + "\" in project \""
                    + project.getName() + "\".";

            // Send email to the member
            try {
                emailService.sendEmail(member.getEmail(), "Projectory - Task Assignment Notification", content);
                System.out.println("Email sent to: " + member.getEmail());
            } catch (MessagingException e) {
                e.printStackTrace();
                System.out.println("Error sending email to: " + member.getEmail());
            }
        } else {
            System.out.println("Project or Member not found!");
        }

        return true;
    }

    // Remove the task from the assigned member when it's completed
    public void removeTaskFromAssignedMember(int taskID) {
        // Find the assignment of the task to the member (there should only be one assignment)
        MemberHasTask assignment = memberHasTaskRepository.findByTask_TaskID(taskID);

        // If an assignment exists, delete it
        if (assignment != null) {
            memberHasTaskRepository.delete(assignment);
        }
    }
    public List<Integer> getTaskIdsByMemberId(int memberID) {
        List<MemberHasTask> assignments = memberHasTaskRepository.findByMember_UserID(memberID);
        return assignments.stream()
                .map(assignment -> assignment.getTask().getTaskID())
                .collect(Collectors.toList());
    }
}
