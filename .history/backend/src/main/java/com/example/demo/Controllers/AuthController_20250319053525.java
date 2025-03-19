package com.example.demo.Controllers;

import com.example.demo.Models.Account;
import com.example.demo.Services.AccountService;
import com.example.demo.Services.UserService;
import com.example.demo.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
