package com.example.demo.dto;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
}

public String getUsername() { return username; }
public String getPassword() { return password; }
public String getEmail() { return email; }
