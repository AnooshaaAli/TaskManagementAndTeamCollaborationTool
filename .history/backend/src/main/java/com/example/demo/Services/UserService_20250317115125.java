package com.example.demo.Services;

import com.example.demo.model.Account;
import com.example.demo.model.User;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, String email) {
        // Check if username or email already exists
        if (accountRepository.findByEmail(email).isPresent() || accountRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username or email already exists!");
        }

        // Create new account
        Account account = new Account();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password)); // Encrypt password
        account.setEmail(email);

        // Save account to DB
        Account savedAccount = accountRepository.save(account);

        // Create User and associate with Account
        User user = new User();
        user.setAccount(savedAccount);

        // Save user
        return userRepository.save(user);
    }
}
