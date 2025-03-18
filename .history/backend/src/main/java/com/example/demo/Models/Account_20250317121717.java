package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountID;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    public void setUsername(String username) { this.username = username; }
public void setPassword(String password) { this.password = password; }
public void setEmail(String email) { this.email = email; }

}
