package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterionRequest {
    private String username;
    private String email;
    private String password;
}
