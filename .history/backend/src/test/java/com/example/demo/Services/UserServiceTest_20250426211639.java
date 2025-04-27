package com.example.demo.Services;

import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        Account account = new Account();
        account.setUsername("testUser");
        account.setEmail("test@example.com");
        account.setPassword("password123");

        User user = new User();
        user.setAccount(account);

        when(userRepository.save(any(User.class))).thenReturn(user);

        User createdUser = userService.createUser(account);

        assertNotNull(createdUser);
        assertEquals("testUser", createdUser.getAccount().getUsername());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testLoadUserByUsername_Success() {
        String email = "test@example.com";
        
        Account account = new Account();
        account.setEmail(email);
        account.setPassword("password123");

        User user = new User();
        user.setAccount(account);

        when(userRepository.findByAccount_Email(email)).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());
        assertEquals("password123", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                   .anyMatch(a -> a.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void testLoadUserByUsername_NotFound() {
        String email = "notfound@example.com";
        
        when(userRepository.findByAccount_Email(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername(email);
        });
    }

    @Test
    void testFindUserByAccountUsername() {
        String username = "testUser";

        User user = new User();
        Account account = new Account();
        account.setUsername(username);
        user.setAccount(account);

        when(userRepository.findUserByAccountUsername(username)).thenReturn(user);

        User foundUser = userService.findUserByAccountUsername(username);

        assertNotNull(foundUser);
        assertEquals(username, foundUser.getAccount().getUsername());
    }

    @Test
    void testGetUserById() {
        Integer userId = 1;

        User user = new User();
        user.setUserID(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(userId);

        assertTrue(result.isPresent());
        assertEquals(userId, result.get().getUserID());
    }

    @Test
    void testGetUserById_NotFound() {
        Integer userId = 2;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(userId);

        assertFalse(result.isPresent());
    }
}
