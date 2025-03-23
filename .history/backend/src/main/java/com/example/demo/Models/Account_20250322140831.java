package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Account")
@Getter
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

    public Account() {
    }

    public Account(int id, String username, String email, String password) {
        this.accountID = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
/*************  ✨ Codeium Command ⭐  *************/
    
    public int getId() {
        return accountID;
    }
/******  97eefbb2-8c48-4341-9ea0-9b47004f83a6  *******/
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
