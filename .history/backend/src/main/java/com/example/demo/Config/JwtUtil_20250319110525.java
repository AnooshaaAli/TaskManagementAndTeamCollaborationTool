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
    @org.springframework.beans.factory.annotation.Value("${jwt.secret}")
    private String secretKey;    
     
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Generate a JWT token with the given email as the subject.
     *
     * The token will have the following claims:
     * - sub: the email
/******  2d2f7702-c348-46a9-a89c-feb583e76d42  *******/
     * - exp: the current time plus the expiration time
     *
     * @param email the email to include in the token's subject claim
     * @return the generated JWT token
     */
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
