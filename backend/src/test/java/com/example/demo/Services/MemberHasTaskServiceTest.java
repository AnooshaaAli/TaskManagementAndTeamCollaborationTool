package com.example.demo.Services;

import com.example.demo.Models.*;
import com.example.demo.Repositories.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MemberHasTaskServiceTest {

    @InjectMocks
    private MemberHasTaskService memberHasTaskService;

    @Mock
    private MemberHasTaskRepository memberHasTaskRepository;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TeamRepository teamHasMemberRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private TaskListRepository taskListRepository;

    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAssignTaskToMember_Success() {
        int taskID = 1;
        int memberID = 10;

        Task task = new Task();
        task.setTaskID(taskID);
        task.setTitle("Sample Task");
        task.setListID(100);

        User member = new User();
        member.setUserID(memberID);
        member.setUsername("Test User");

        TaskList taskList = new TaskList();
        taskList.setListID(100);
        taskList.setProjectID(200);

        Project project = new Project();
        project.setProjectID(200);
        project.setName("Test Project");

        when(memberHasTaskRepository.existsByTask_TaskID(taskID)).thenReturn(false);
        when(taskRepository.findById(taskID)).thenReturn(Optional.of(task));
        when(userRepository.findById(memberID)).thenReturn(Optional.of(member));
        when(taskListRepository.findById(100)).thenReturn(Optional.of(taskList));
        when(projectRepository.findById(200)).thenReturn(Optional.of(project));

        boolean result = memberHasTaskService.assignTaskToMember(taskID, memberID);

        assertTrue(result);
        verify(memberHasTaskRepository, times(1)).save(any(MemberHasTask.class));
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    void testAssignTaskToMember_AlreadyAssigned() {
        int taskID = 1;
        int memberID = 10;

        when(memberHasTaskRepository.existsByTask_TaskID(taskID)).thenReturn(true);

        boolean result = memberHasTaskService.assignTaskToMember(taskID, memberID);

        assertFalse(result);
        verify(memberHasTaskRepository, never()).save(any(MemberHasTask.class));
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testAssignTaskToMember_TaskOrMemberNotFound() {
        int taskID = 1;
        int memberID = 10;

        when(memberHasTaskRepository.existsByTask_TaskID(taskID)).thenReturn(false);
        when(taskRepository.findById(taskID)).thenReturn(Optional.empty()); // Task not found
        when(userRepository.findById(memberID)).thenReturn(Optional.of(new User()));

        boolean result = memberHasTaskService.assignTaskToMember(taskID, memberID);

        assertFalse(result);
        verify(memberHasTaskRepository, never()).save(any(MemberHasTask.class));
    }
}
