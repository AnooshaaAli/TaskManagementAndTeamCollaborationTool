package com.example.demo.Controllers;

import com.example.demo.Config.JwtUtil;
import com.example.demo.Models.Account;
import com.example.demo.Models.User;
import com.example.demo.Services.AccountService;
import com.example.demo.Services.UserService;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegistrationRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class AuthControllerTest {

    @Mock
    private AccountService accountService;

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ---------- Test: registerUser --------------

    @Test
    void testRegisterUser_Success() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");
        request.setUsername("testuser");
        request.setPassword("password");

        when(accountService.getAccountByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(accountService.createAccount(anyString(), anyString(), anyString())).thenReturn(new Account());

        ResponseEntity<Map<String, String>> response = authController.registerUser(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully!", response.getBody().get("message"));
        verify(userService, times(1)).createUser(any(Account.class));
    }

    @Test
    void testRegisterUser_EmailAlreadyExists() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");

        when(accountService.getAccountByEmail(request.getEmail())).thenReturn(Optional.of(new Account()));

        ResponseEntity<Map<String, String>> response = authController.registerUser(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email is already registered", response.getBody().get("message"));
    }

    // ---------- Test: login --------------

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        Account account = new Account();
        account.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode("password"));

        when(accountService.getAccountByEmail(request.getEmail())).thenReturn(Optional.of(account));
        when(jwtUtil.generateToken(request.getEmail())).thenReturn("fake-jwt-token");

        ResponseEntity<?> response = authController.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof AuthResponse);
        assertEquals("fake-jwt-token", ((AuthResponse) response.getBody()).getToken());
    }

    @Test
    void testLogin_WrongPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrongpassword");

        Account account = new Account();
        account.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode("password"));

        when(accountService.getAccountByEmail(request.getEmail())).thenReturn(Optional.of(account));

        ResponseEntity<?> response = authController.login(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Incorrect email or password.", ((Map<?, ?>) response.getBody()).get("message"));
    }

    @Test
    void testLogin_UserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("notfound@example.com");

        when(accountService.getAccountByEmail(request.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.login(request);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found.", ((Map<?, ?>) response.getBody()).get("message"));
    }

    // ---------- Test: getUserDetails --------------

    @Test
    void testGetUserDetails_Success() {
        String token = "Bearer valid-token";
        String email = "test@example.com";

        Account account = new Account();
        account.setId(1);
        account.setUsername("testuser");
        account.setEmail(email);

        when(jwtUtil.extractEmail("valid-token")).thenReturn(email);
        when(accountService.getAccountByEmail(email)).thenReturn(Optional.of(account));

        ResponseEntity<?> response = authController.getUserDetails(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals(1, body.get("userID"));
        assertEquals("testuser", body.get("username"));
        assertEquals(email, body.get("email"));
    }

    @Test
    void testGetUserDetails_InvalidToken() {
        String token = "Bearer invalid-token";

        when(jwtUtil.extractEmail("invalid-token")).thenThrow(new RuntimeException());

        ResponseEntity<?> response = authController.getUserDetails(token);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid token.", ((Map<?, ?>) response.getBody()).get("message"));
    }

    @Test
    void testGetUserDetails_UserNotFound() {
        String token = "Bearer valid-token";
        String email = "test@example.com";

        when(jwtUtil.extractEmail("valid-token")).thenReturn(email);
        when(accountService.getAccountByEmail(email)).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.getUserDetails(token);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found.", ((Map<?, ?>) response.getBody()).get("message"));
    }

    // ---------- Test: getUserById --------------

    @Test
    void testGetUserById_Success() {
        String token = "Bearer valid-token";
        Integer userId = 1;
        String email = "test@example.com";

        Account account = new Account();
        account.setUsername("testuser");
        account.setEmail(email);

        User user = new User();
        user.setUserID(userId);
        user.setAccount(account);

        when(jwtUtil.extractEmail("valid-token")).thenReturn(email);
        when(accountService.getAccountByEmail(email)).thenReturn(Optional.of(account));
        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<?> response = authController.getUserById(userId, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals(userId, body.get("userID"));
        assertEquals("testuser", body.get("username"));
        assertEquals(email, body.get("email"));
    }

    @Test
    void testGetUserById_UserNotFound() {
        String token = "Bearer valid-token";
        Integer userId = 1;
        String email = "test@example.com";

        Account account = new Account();
        account.setEmail(email);

        when(jwtUtil.extractEmail("valid-token")).thenReturn(email);
        when(accountService.getAccountByEmail(email)).thenReturn(Optional.of(account));
        when(userService.getUserById(userId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.getUserById(userId, token);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found.", ((Map<?, ?>) response.getBody()).get("message"));
    }

    @Test
    void testGetUserById_InvalidToken() {
        String token = "Bearer invalid-token";

        when(jwtUtil.extractEmail("invalid-token")).thenThrow(new RuntimeException());

        ResponseEntity<?> response = authController.getUserById(1, token);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid token.", ((Map<?, ?>) response.getBody()).get("message"));
    }
}
