package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterationRequest {
    private String username;
    private String email;
    private String password;
}
