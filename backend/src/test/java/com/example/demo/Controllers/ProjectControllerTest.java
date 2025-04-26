package com.example.demo.Controllers;

import com.example.demo.Models.Project;
import com.example.demo.Models.TaskList;
import com.example.demo.Models.Comment;
import com.example.demo.Models.Files;
import com.example.demo.Services.ProjectService;
import com.example.demo.dto.FileInfoDTO;
import com.example.demo.dto.TeamProjectDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class ProjectControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @InjectMocks
        private ProjectController projectController;

        @Mock
        private ProjectService projectService;

        @Mock
        private RestTemplate restTemplate;

        private ObjectMapper objectMapper = new ObjectMapper();

        private static final String AUTH_HEADER = "Bearer faketoken";

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
        }

        @Test
        void testCreateProject() {
                // Arrange
                Project input = new Project();
                input.setName("Test Project");

                Project saved = new Project();
                saved.setProjectID(1);
                saved.setName("Test Project");

                when(projectService.createProject(input)).thenReturn(saved);

                TaskList todoList = new TaskList();
                todoList.setListID(100);
                TaskList doneList = new TaskList();
                doneList.setListID(101);

                when(restTemplate.postForEntity(eq("http://localhost:8080/lists"), any(), eq(TaskList.class)))
                                .thenReturn(new ResponseEntity<>(todoList, HttpStatus.CREATED))
                                .thenReturn(new ResponseEntity<>(doneList, HttpStatus.CREATED));

                String authHeader = "Bearer faketoken";

                // Act
                ResponseEntity<Project> response = projectController.createProject(input, authHeader);

                // Assert
                assertEquals(HttpStatus.CREATED, response.getStatusCode());
                assertEquals(saved.getProjectID(), response.getBody().getProjectID());
                assertEquals(2, response.getBody().getLists().size());

                verify(projectService, times(1)).createProject(input);
                verify(restTemplate, times(2)).postForEntity(eq("http://localhost:8080/lists"), any(),
                                eq(TaskList.class));
        }

        @Test
        void testGetProjectById_success() {
                int projectId = 1;

                Project mockProject = new Project();
                mockProject.setProjectID(projectId);
                mockProject.setName("Test Project");

                TaskList mockTaskList = new TaskList();
                mockTaskList.setListID(1);
                mockTaskList.setName("Test List");

                Comment mockComment = new Comment();
                mockComment.setCommentID(1);
                mockComment.setValue("Test comment");

                FileInfoDTO mockFileDTO = new FileInfoDTO();
                mockFileDTO.setFileID(1);
                mockFileDTO.setFileName("test.txt");

                // Mock service
                when(projectService.getProjectById(projectId)).thenReturn(Optional.of(mockProject));

                // Mock Task Lists
                HashMap<Integer, TaskList> taskListMap = new HashMap<>();
                taskListMap.put(1, mockTaskList);
                when(restTemplate.exchange(
                                eq("http://localhost:8080/lists/project/" + projectId),
                                eq(HttpMethod.GET),
                                ArgumentMatchers.<HttpEntity<String>>any(),
                                ArgumentMatchers.<ParameterizedTypeReference<HashMap<Integer, TaskList>>>any()))
                                .thenReturn(new ResponseEntity<>(taskListMap, HttpStatus.OK));

                // Mock Comments
                List<Comment> commentList = List.of(mockComment);
                when(restTemplate.exchange(
                                eq("http://localhost:8080/comments/" + projectId),
                                eq(HttpMethod.GET),
                                ArgumentMatchers.<HttpEntity<String>>any(),
                                ArgumentMatchers.<ParameterizedTypeReference<List<Comment>>>any()))
                                .thenReturn(new ResponseEntity<>(commentList, HttpStatus.OK));

                // Mock Files
                HashMap<Integer, FileInfoDTO> fileDtoMap = new HashMap<>();
                fileDtoMap.put(1, mockFileDTO);
                when(restTemplate.exchange(
                                eq("http://localhost:8080/files/project/" + projectId),
                                eq(HttpMethod.GET),
                                ArgumentMatchers.<HttpEntity<String>>any(),
                                ArgumentMatchers.<ParameterizedTypeReference<HashMap<Integer, FileInfoDTO>>>any()))
                                .thenReturn(new ResponseEntity<>(fileDtoMap, HttpStatus.OK));

                // Act
                String authHeader = "Bearer faketoken";
                ResponseEntity<?> response = projectController.getProjectById(projectId, authHeader);

                // Assert
                assertEquals(HttpStatus.OK, response.getStatusCode());

                Project responseProject = (Project) response.getBody();
                assertNotNull(responseProject);
                assertEquals("Test Project", responseProject.getName());

                Map<Integer, TaskList> lists = responseProject.getLists();
                assertNotNull(lists);
                assertEquals("Test List", lists.get(1).getName());

                Map<Integer, Comment> comments = responseProject.getComments();
                assertNotNull(comments);
                assertEquals("Test comment", comments.get(1).getValue());

                Map<Integer, Files> files = responseProject.getFiles();
                assertNotNull(files);
                assertEquals("test.txt", files.get(1).getFileName());

        }

        @Test
        void testDeleteProject_success() {
                int projectId = 1;

                Project mockProject = new Project();
                mockProject.setProjectID(projectId);
                mockProject.setName("Test Project");

                String authHeader = "Bearer faketoken";
                String deleteTeamUrl = "http://localhost:8080/api/team/project/" + projectId;

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", authHeader);
                HttpEntity<Void> expectedRequestEntity = new HttpEntity<>(headers);

                // Mock: project exists
                when(projectService.getProjectById(projectId)).thenReturn(Optional.of(mockProject));

                // Mock: team deletion call
                when(restTemplate.exchange(
                                eq(deleteTeamUrl),
                                eq(HttpMethod.DELETE),
                                eq(expectedRequestEntity),
                                eq(Void.class)))
                                .thenReturn(new ResponseEntity<>(HttpStatus.NO_CONTENT));

                // No need to mock deleteProject() if it's void, but we still verify it was
                // called
                doNothing().when(projectService).deleteProject(projectId);

                // Act
                ResponseEntity<Project> response = projectController.deleteProject(projectId, authHeader);

                // Assert
                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertEquals(projectId, response.getBody().getProjectID());
                assertEquals("Test Project", response.getBody().getName());

                verify(projectService, times(1)).getProjectById(projectId);
                verify(restTemplate, times(1)).exchange(eq(deleteTeamUrl), eq(HttpMethod.DELETE), any(HttpEntity.class),
                                eq(Void.class));
                verify(projectService, times(1)).deleteProject(projectId);
        }

        @Test
        void testGetProjectsByUserId_success() {
                // Arrange
                int userId = 123;

                // Mock projects where the user is the team lead
                Project leadProject = new Project();
                leadProject.setProjectID(1);
                leadProject.setName("Lead Project");

                when(projectService.getProjectsByTeamLead(userId)).thenReturn(List.of(leadProject));

                // Mock team projects the user is a member of
                TeamProjectDTO teamDto = new TeamProjectDTO(10,2);

                List<TeamProjectDTO> teamDtoList = List.of(teamDto);

                ResponseEntity<List<TeamProjectDTO>> teamsResponse = new ResponseEntity<>(teamDtoList, HttpStatus.OK);
                when(restTemplate.exchange(
                                eq("http://localhost:8080/api/team/user/" + userId),
                                eq(HttpMethod.GET),
                                any(HttpEntity.class),
                                ArgumentMatchers.<ParameterizedTypeReference<List<TeamProjectDTO>>>any()))
                                .thenReturn(teamsResponse);

                // Mock the project returned from team membership
                Project memberProject = new Project();
                memberProject.setProjectID(2);
                memberProject.setName("Member Project");

                when(projectService.getProjectById(2)).thenReturn(Optional.of(memberProject));

                // Act
                ResponseEntity<HashMap<Integer, Project>> response = projectController.getProjectsByUserId(userId,
                                AUTH_HEADER);

                // Assert
                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertNotNull(response.getBody());
                HashMap<Integer, Project> projectMap = response.getBody();
                assertEquals(2, projectMap.size());

                assertTrue(projectMap.containsKey(1));
                assertTrue(projectMap.containsKey(2));

                assertEquals("Lead Project", projectMap.get(1).getName());
                assertEquals("Member Project", projectMap.get(2).getName());

                // Verify calls
                verify(projectService, times(1)).getProjectsByTeamLead(userId);
                verify(restTemplate, times(1)).exchange(
                                eq("http://localhost:8080/api/team/user/" + userId),
                                eq(HttpMethod.GET),
                                any(HttpEntity.class),
                                ArgumentMatchers.<ParameterizedTypeReference<List<TeamProjectDTO>>>any());
                verify(projectService, times(1)).getProjectById(2);
        }

}
