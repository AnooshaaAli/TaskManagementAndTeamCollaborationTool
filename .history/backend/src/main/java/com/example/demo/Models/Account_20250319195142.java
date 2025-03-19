package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Account")
@Getter
@Setter
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountID;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    public Account(int id, String username, String email, String password) {
        this.accountID = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    

    public String getPassword() {
        return password;
    }    
    
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}
