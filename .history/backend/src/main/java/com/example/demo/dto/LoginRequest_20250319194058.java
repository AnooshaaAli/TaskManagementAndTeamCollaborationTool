package com.example.demo.dto;

// For Spring Boot 2.x
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

// For Spring Boot 3.x (uncomment these and comment the above if using Spring Boot 3.x)
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

