package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @ManyToOne
    @JoinColumn(name = "accountID", nullable = false)
    private Account account;

    public void setAccount(Account account) {
        this.account = account;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public static Object builder() {
        return null;
    }

    public Account getAccount() {
        return this.account;
    }

    public String getEmail() {
        return account != null ? account.getEmail() : null;
    }

    public String getUsername() {
        return account != null ? account.getUsername() : null;
    }

    public String getPassword() {
        return account != null ? account.getPassword() : null;
    }


    public void setEmail(String email) {
        if (account != null) {
            account.setEmail(email);
        }
    }

    public void setUsername(String username) {
        if (account != null) {
            account.setUsername(username);
        }
    }
}
