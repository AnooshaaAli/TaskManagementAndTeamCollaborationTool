package com.example.demo.Services;

import com.example.demo.Models.Account;
import com.example.demo.Repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Account createAccount(String username, String email, String password) {
        // Hash the password before storing
        String hashedPassword = passwordEncoder.encode(password);
        Account account = new Account(0, username, email, hashedPassword);
        return accountRepository.save(account);
    }

    public Optional<Account> getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Optional<Account> getAccountById(Integer accountID) {
        return accountRepository.findById(accountID);
    }

    // Method to update an existing account
    public Account updateAccount(Account account) {
        return accountRepository.save(account); // Save the updated account back to the repository
    }
}
