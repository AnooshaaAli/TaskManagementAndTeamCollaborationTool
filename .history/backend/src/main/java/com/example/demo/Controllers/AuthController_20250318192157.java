package com.example.demo.Controllers;

import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Services.AccountService;
import com.example.demoservices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        // Check if email is already in use
        Optional<Account> existingAccount = accountService.getAccountByEmail(request.getEmail());
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        // Create account
        Account account = accountService.createAccount(request.getUsername(), request.getEmail(), request.getPassword());

        // Create user entry linked to the account
        userService.createUser(account);

        return ResponseEntity.ok("User registered successfully!");
    }
}
