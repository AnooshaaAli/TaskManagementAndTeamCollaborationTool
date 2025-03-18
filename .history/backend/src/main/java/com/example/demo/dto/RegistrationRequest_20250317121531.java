package com.example.demo.dto;

import lombok.Data;

@Getter
@Setter
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
}
