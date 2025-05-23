package com.example.demo.Config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.Value;

import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {
    @Valimport org.springframework.beans.factory.annotation.Value;
    
    // ...
    
    @Component
    public class JwtUtil {
        @org.springframework.beans.factory.annotation.Value("${jwt.secret}")
        private String secretKey;    
        // ...
    }ue("${jwt.secret}")
    private String secretKey;    
     
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // Ensure key is correctly initialized
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }    

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
