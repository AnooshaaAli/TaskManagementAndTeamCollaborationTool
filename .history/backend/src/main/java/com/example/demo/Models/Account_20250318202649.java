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

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    public Account(int id, String username, String email, String password) {
        this.accountID = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
}
