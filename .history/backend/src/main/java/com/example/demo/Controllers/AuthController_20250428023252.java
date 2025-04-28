package com.example.demo.Controllers;

import com.example.demo.Config.JwtUtil;
import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Services.AccountService;
import com.example.demo.Services.UserService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegistrationRequest;
import com.example.demo.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegistrationRequest request) {
        Map<String, String> response = new HashMap<>();
    
        // Check if email is already in use
        Optional<Account> existingAccount = accountService.getAccountByEmail(request.getEmail());
        if (existingAccount.isPresent()) {
            response.put("message", "Email is already registered");
            return ResponseEntity.badRequest().body(response);
        }
    
        // Create account
        Account account = accountService.createAccount(request.getUsername(), request.getEmail(), request.getPassword());
    
        // Create user entry linked to the account
        userService.createUser(account);
    
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    } 
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Account> account = accountService.getAccountByEmail(request.getEmail());
    
        if (account.isPresent()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(request.getPassword(), account.get().getPassword())) { 
                String token = jwtUtil.generateToken(request.getEmail());
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                // 🔹 Return JSON response instead of plain text
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                     .body(Collections.singletonMap("message", "Incorrect email or password."));
            }
        }
        
        // 🔹 Consistently return JSON for user not found case
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(Collections.singletonMap("message", "User not found."));
    }
    
    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            // Extract the email from the JWT token
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            
            // Fetch the account associated with the email
            Optional<Account> account = accountService.getAccountByEmail(email);
            
            if (account.isPresent()) {
                Account user = account.get();
    
                // Populate the response map with the user details
                response.put("userID", user.getId());
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                
                // Assuming the profile picture URL is part of the Account model, include it in the response
                response.put("profilePicUrl", user.getProfilePicFileID());  // Add this line if profilePicUrl exists in the Account model
    
                return ResponseEntity.ok(response);
            }
            
            // Return a "not found" response if the user doesn't exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Collections.singletonMap("message", "User not found."));
        } catch (Exception e) {
            // Return an "unauthorized" response if the token is invalid or an error occurs
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Collections.singletonMap("message", "Invalid token."));
        }
    }    

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId, @RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
    
            Optional<Account> account = accountService.getAccountByEmail(email);

            if (account.isPresent()) {
                Optional<User> user = userService.getUserById(userId);

                if (user.isPresent()) {
                    response.put("userID", user.get().getUserID());
                    response.put("username", user.get().getUsername());
                    response.put("email", user.get().getEmail());
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(Collections.singletonMap("message", "User not found."));
                }
            }
    
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid token."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid token."));
        }
    }    
}
