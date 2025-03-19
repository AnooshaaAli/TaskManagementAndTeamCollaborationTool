package com.example.demo.Controllers;

import com.example.demo.Config.JwtUtil;
import com.example.demo.Models.Account;
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
    
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Account account = accountService.findByEmail(loginRequest.getEmail());
    
        if (account == null || !passwordEncoder.matches(loginRequest.getPassword(), account.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Collections.singletonMap("message", "Incorrect email or password."));
        }
    
        String token = jwtUtil.generateToken(account);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }    
}
