package com.example.demo.Services;

import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    public User createUser(Account account) {
        User user = new User();
        user.setAccount(account);
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getAccount().getEmail())  // Get the email from Account
                .password(user.getAccount().getPassword())  // Assuming Account stores password
                .authorities("USER")  // You can customize roles/authorities
                .build();
    }
    
    
}
