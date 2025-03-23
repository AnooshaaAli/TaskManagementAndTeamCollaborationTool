package com.example.demo.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Services.TeamService;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/add-member")
    public ResponseEntity<String> addMember(@RequestParam String searchInput, 
                                            @RequestParam int currentUserId,
                                            @RequestParam Long projectId) {
        String response = teamService.addMemberToProject(searchInput, currentUserId, projectId);
        return ResponseEntity.ok(response);
    }
}
