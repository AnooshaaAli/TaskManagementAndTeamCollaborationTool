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
