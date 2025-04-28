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

    @Column(name = "profilePicFileID", nullable = true) // Make sure it is nullable in the entity as well
    private Integer profilePicFileID; // Change to Integer so it can be null

    public Account() {
    }

    public Account(int id, String username, String email, String password) {
        this.accountID = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return accountID;
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

    public void setId(int id) {
        this.accountID = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getProfilePicFileID() {
        return profilePicFileID;
    }

    public void setProfilePicFileID(Integer profilePicFileID) {
        this.profilePicFileID = profilePicFileID;
    }
}
