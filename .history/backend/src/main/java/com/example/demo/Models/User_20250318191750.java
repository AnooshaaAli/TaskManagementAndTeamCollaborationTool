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
}
