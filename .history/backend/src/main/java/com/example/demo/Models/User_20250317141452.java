package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")  // Avoid using reserved keywords
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @OneToOne(cascade = CascadeType.PERSIST)  // Prevent unintended deletions
    @JoinColumn(name = "accountID", referencedColumnName = "accountID", nullable = false)
    private Account account;

    public void setAccount(Account account) { this.account = account; }
}
